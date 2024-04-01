"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { OrganizationSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";

export const organizationSettings = async (
    values: z.infer<typeof OrganizationSchema>,
    activeOrg: any,
  ) => {
    const user = await currentUser();
  
    if (!user) {
      return { error: "Unauthorized" }
    }
  
    await db.organization.update({
      where: { id: activeOrg.id },
      data: {
        name: values.name,
      }
    });
  
    return { success: "Organization Updated!" }
  }