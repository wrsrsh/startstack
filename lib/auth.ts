import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import env from "env";

export const auth = betterAuth({
    appName: env.NEXT_PUBLIC_APP_NAME,
    appUrl: env.NEXT_PUBLIC_APP_URL,
    plugins: [
        organization()
    ]
});