"use server";

import { update } from "@/auth";
import { db } from "@/lib/db";

export const leaveOrganization = async (orgId: string, userId: string) => {
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

    const organizationUsersCount = await db.organizationUser.count({
        where: {
            organizationId: orgId
        }
    });

    if (organizationUsersCount <= 1) {
        await db.organizationUser.deleteMany({
            where: {
                organizationId: orgId
            }
        });
        await db.organization.delete({
            where: {
                id: orgId
            }
        });
        return { success: "Organization deleted as it has no more members", isOrgDeleted: true };
    }

    await db.organizationUser.delete({
        where: {
            userId_organizationId: {
                userId: userId,
                organizationId: orgId
            }
        }
    });

    return { success: "User left the organization", isOrgDeleted: false };
};