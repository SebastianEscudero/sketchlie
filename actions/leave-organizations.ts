"use server";

import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export const leaveOrganization = async (orgId: string, userId: string) => {
    const organization = await db.organization.findUnique({
        where: { id: orgId },
        include: {
            users: true
        }
    });

    if (!organization) {
        return { error: "Organization not found" };
    }

    const userToLeave = organization.users.find(u => u.userId === userId);
    
    if (!userToLeave) {
        return { error: "User is not a member of the organization" };
    }

    // Check if user is the last admin and there are other users
    if (userToLeave.role === "Admin") {
        const adminCount = organization.users.filter(u => u.role === "Admin").length;
        if (adminCount === 1 && organization.users.length > 1) {
            return { error: "Cannot leave: You must transfer admin rights to another user first" };
        }
    }

    await db.organizationUser.delete({
        where: {
            userId_organizationId: {
                userId: userId,
                organizationId: orgId
            }
        }
    });

    return { success: "User left the organization" };
};