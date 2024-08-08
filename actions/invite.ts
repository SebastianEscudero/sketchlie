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

      const isMember = await db.organizationUser.findFirst({
        where: {
          userId: isRegistered?.id,
          organizationId: activeOrg.id,
        },
      });

      if (isMember && isRegistered) {
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

      if (existingInvitation) {
        pendingEmails.push(member.email);
      } else {
        const newInvitation = await db.organizationInvitation.create({
          data: {
            email: member.email,
            organizationId: activeOrg.id,
            role: member.role,
            subscriptionPlan: activeOrg.subscriptionPlan,
          },
        });

        const invitationId = newInvitation.id;

        // send email
        await sendOrganizationInvite(member.email, activeOrg.name, activeOrg.id, invitationId, user);
      }
    }
  }

  if (pendingEmails.length > 0) {
    return { error: `The invitations could not be sent. There are already pending invitations for the following email addresses: ${pendingEmails.join(', ')}.` }
  }

  return { success: "Invitations Sent" }
}