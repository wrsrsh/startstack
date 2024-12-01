import env from "@/env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as tables from "./tables";
// import * as relations from "./relations";
import postgres from "postgres";

const sql = postgres(env.DATABASE_URL);

export const db = drizzle(sql, {
  schema: {
    ...tables,
    // ...relations,
  },
});
