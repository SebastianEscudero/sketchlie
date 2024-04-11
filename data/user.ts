import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        organizations: {
          select: {
            organization: {
              select: {
                id: true,
                name: true,
                subscriptionPlan: true,
                subscription: true,
                users: true
              }
            }
          }
        },
        invitations: {
          select: {
            id: true,
            email: true,
            status: true,
            organization: { 
              select: {
                id: true,
                name: true
              }
            }
          }
        },
      },
    });

    return user;
  } catch {
    return null;
  }
};