import { SendOrganizationInviteTemplate, SendPasswordResetTemplate, SendVerificationEmailTemplate } from "@/components/auth/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: "Sketchlie <resetpassword@sketchlie.com>",
    to: email,
    subject: "Reset your password",
    text: `$Click here to reset your password ${resetLink}`,
    react: SendPasswordResetTemplate({ resetLink: resetLink}),
  });
};

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Sketchlie <verification@sketchlie.com>",
    to: email,
    subject: "Confirm your email",
    text: `$Click here to confirm your email ${confirmLink}`,
    react: SendVerificationEmailTemplate({ confirmLink: confirmLink}),
  });
};

export const sendOrganizationInvite = async (
  email: string, 
  activeOrgName: any,
  user: any
) => {
  const dashboardLink = `${domain}/dashboard`;

  await resend.emails.send({
    from: "Sketchlie <invitations@sketchlie.com>",
    to: email,
    subject: `${user.name} has invited you to join ${activeOrgName} - Sketchlie`,
    text: `${user.name} has invited you to join ${activeOrgName} - Sketchlie. Click here to join: ${dashboardLink}`,
    react: SendOrganizationInviteTemplate({ user: user, activeOrgName: activeOrgName, dashboardLink: dashboardLink}),
  });
};