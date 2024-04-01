import { EmailTemplate } from "@/components/auth/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
      <div style="text-align: center;">
        <p>Click <a href="${resetLink}">here</a> to reset password.</p>
      </div>
    `
  });
};

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
      <div style="text-align: center;">
        <p>Click <a href="${confirmLink}">here</a> to confirm email.</p>
      </div>
    `
  });
};

export const sendOrganizationInvite = async (
  email: string, 
  activeOrgName: any,
  user: any
) => {
  const dashboardLink = `http://localhost:3000/dashboard`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: `${user.name} has invited you to join ${activeOrgName} - Sketchlie`,
    text: `${user.name} has invited you to join ${activeOrgName} - Sketchlie. Click here to join: ${dashboardLink}`,
    react: EmailTemplate({ user: user, activeOrgName: activeOrgName, dashboardLink: dashboardLink}),
  });
};