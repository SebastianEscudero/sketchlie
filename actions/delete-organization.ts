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

    // Delete OrganizationUser records associated with the organization
    await db.organizationUser.deleteMany({
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