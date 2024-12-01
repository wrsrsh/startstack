import { pgTable, text } from "drizzle-orm/pg-core";

export const testTable = pgTable("test_table", {
  id: text("id").primaryKey(),
});