"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { OrganizationSchema } from "@/schemas";

export const organization = async (values: z.infer<typeof OrganizationSchema>, userId: string) => {
    const validatedFields = OrganizationSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { name } = validatedFields.data;

    const createdOrganization = await db.organization.create({
        data: {
            name,
            users: {
                create: {
                    userId,
                }
            }
        }
    });

    return { success: `Organization ${name} Created!`, id: createdOrganization.id };
};