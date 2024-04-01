import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  isOAuth: boolean;
  organizations: Array[];
  invitations: Array[];
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
