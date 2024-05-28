"use server";

import { Role } from "@prisma/client"; // Import the Role enum
import { db } from "@/lib/db";

export const editUserRole = async (orgId: string, userId: string, newRole: Role) => {
  const organizationUser = await db.organizationUser.findUnique({
    where: {
      userId_organizationId: {
        userId: userId,
        organizationId: orgId
      }
    }
  });

  if (!organizationUser) {
    return { error: "User is not a member of the organization" };
  }

  await db.organizationUser.update({
    where: {
      userId_organizationId: {
        userId: userId,
        organizationId: orgId
      }
    },
    data: {
      role: newRole
    }
  });

  return { success: "User role updated successfully" };
};