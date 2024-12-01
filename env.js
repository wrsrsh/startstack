import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_APP_URL: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL, 
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});

export default env;