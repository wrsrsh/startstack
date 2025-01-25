import env from "@/env";
import {
  magicLinkClient,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,
  plugins: [magicLinkClient()],
});

export const {
  signIn,
  signOut,
  signUp,
  revokeSession,
  updateUser,
  getSession,
  magicLink,
  changePassword,
  resetPassword,
  sendVerificationEmail,
  changeEmail,
  deleteUser,
  linkSocial,
  forgetPassword,
  useSession,
  verifyEmail,
  listAccounts,
  listSessions,
  revokeOtherSessions,
  revokeSessions,
} = authClient;
