import { createClient } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import type { GenericCtx } from "@convex-dev/better-auth/utils";
import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";

import { components } from "../_generated/api";
import type { DataModel } from "../_generated/dataModel";
import authConfig from "../auth.config";
import { isAdminEmail } from "./admins";
import { sendAdminSignInCode } from "./email";
import schema from "./schema";

export const authComponent = createClient<DataModel, typeof schema>(
  components.betterAuth,
  {
    local: { schema },
    verbose: false,
  },
);

export const createAuthOptions = (ctx: GenericCtx<DataModel>) =>
  ({
    appName: "Asoebi Fashion Week Admin",
    baseURL: process.env.SITE_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: false,
    },
    session: {
      expiresIn: 60 * 60 * 8,
      updateAge: 60 * 60,
    },
    rateLimit: {
      enabled: true,
      window: 60,
      max: 10,
    },
    plugins: [
      emailOTP({
        expiresIn: 60 * 10,
        allowedAttempts: 3,
        storeOTP: "hashed",
        async sendVerificationOTP({ email, otp, type }) {
          if (type !== "sign-in" || !isAdminEmail(email)) {
            throw new Error("This email is not authorized for admin access.");
          }

          await sendAdminSignInCode({ email, otp });
        },
      }),
      convex({ authConfig }),
    ],
  }) satisfies BetterAuthOptions;

export const options = createAuthOptions({} as GenericCtx<DataModel>);

export const createAuth = (ctx: GenericCtx<DataModel>) =>
  betterAuth(createAuthOptions(ctx));
