"use server";

import * as z from "zod";
import { OrganizationInviteSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { sendOrganizationInvite } from "@/lib/mail";
import { db } from "@/lib/db";
import { update } from "@/auth";

export const invite = async (
  validMembers: z.infer<typeof OrganizationInviteSchema>,
  activeOrg: any,
) => {
  const user = await currentUser();

  if (!user?.email) {
    return { error: "Add an email account before inviting members" }
  }

  const pendingEmails = [];

  for (const member of validMembers.members) {
    if (member.email) {
      const isRegistered = await db.user.findUnique({
        where: { email: member.email },
      });

      if (!isRegistered) {
        return { error: "The user has to be registered before joining an organization" }
      }

      const isMember = await db.organizationUser.findFirst({
        where: {
          userId: isRegistered.id,
          organizationId: activeOrg.id,
        },
      });

      if (isMember) {
        return { error: "The user is already a member of this organization" }
      }

      const existingInvitation = await db.organizationInvitation.findUnique({
        where: {
          email_organizationId: {
            email: member.email,
            organizationId: activeOrg.id,
          },
        },
      });

      if (existingInvitation && existingInvitation.status === 'PENDING') {
        pendingEmails.push(member.email);
      } else {
        await sendOrganizationInvite(member.email, activeOrg.name, user);
        const newInvitation = await db.organizationInvitation.create({
          data: {
            email: member.email,
            organizationId: activeOrg.id,
            status: 'PENDING',
            role: member.role,
          },
        });

        await db.user.update({
          where: { email: member.email },
          data: {
            invitations: {
              connect: { id: newInvitation.id },
            },
          },
        });
        update({
          user: {
            ...user,
            invitations: [...user.invitations, newInvitation],
          },
        });
      }
    }
  }

  if (pendingEmails.length > 0) {
    return { error: `The invitations could not be sent. There are already pending invitations for the following email addresses: ${pendingEmails.join(', ')}.` }
  }

  return { success: "Invitations Sent" }
}