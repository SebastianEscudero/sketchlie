"use server";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";


export const acceptInvite = async (
  organizationId: string,
  invitationId: string
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" }
  }

  const invitation = await db.organizationInvitation.findUnique({
    where: { id: invitationId },
    select: {
      subscriptionPlan: true,
      status: true,
      role: true,
    }
  });

  // Check if the invitation exists and is still pending
  if (!invitation || invitation.status !== "PENDING") {
    return { error: "Invalid invitation" };
  }

  await db.organizationUser.create({
    data: {
      userId: dbUser.id,
      organizationId: organizationId,
      role: invitation.role
    },
  });

  // Delete the invitation
  await db.organizationInvitation.delete({
    where: { id: invitationId },
  });

  return { success: "Invitation Accepted!" }
}

export const addUserToOrganization = async (organizationId: string, userId: string, role: any, orgId: string) => {
  try {
    if (!userId) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(userId);

    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    // Check if the user is already part of the organization
    const existingEntry = await db.organizationUser.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
    });

    if (existingEntry) {
      const existingOrg = await db.organization.findUnique({
        where: { id: organizationId },
        include: { users: true, subscription: true }
      });
      return { error: "User is already part of the organization", org: existingOrg };
    }

    await db.organizationUser.create({
      data: {
        userId: userId,
        organizationId: organizationId,
        role: role,
      },
    });

    const updatedOrg = await db.organization.findUnique({
      where: { id: orgId },
      include: { users: true, subscription: true }
    });

    return { success: "User added to organization", org: updatedOrg };
  } catch (error) {
    console.error('Error adding user to organization:', error);
    return { error: 'Error adding user to organization' };
  }
};