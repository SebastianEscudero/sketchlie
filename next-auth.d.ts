import NextAuth, { type DefaultSession } from "next-auth";

export type Subscription = {
  id: string;
  subscriptionId: string;
  mercadoPagoCurrentPeriodEnd: Date;
};

export type ExtendedUser = DefaultSession["user"] & {
  isOAuth: boolean;
  organizations: Array[];
  invitations: Array[];
  subscriptions: Subscription[];
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
