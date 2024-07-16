"use server";

import { db } from "@/lib/db";

export const deleteOrganization = async (orgId: string) => {
    const organization = await db.organization.findUnique({
        where: {
            id: orgId
        }
    });

    if (!organization) {
        return { error: "Organization not found" };
    }

    // Delete OrganizationUser records
    await db.organizationUser.deleteMany({
        where: {
            organizationId: orgId
        }
    });

    // Delete OrganizationSubscription records
    await db.organizationSubscription.deleteMany({
        where: {
            organizationId: orgId
        }
    });

    // Delete OrganizationInvitation records
    await db.organizationInvitation.deleteMany({
        where: {
            organizationId: orgId
        }
    });

    // Then delete the organization
    await db.organization.delete({
        where: {
            id: orgId
        }
    });

    return { success: "Organization deleted" };
};