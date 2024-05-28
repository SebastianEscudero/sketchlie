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