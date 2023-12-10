import type { InferSelectModel } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const url = sqliteTable("url", {
  hash: text("hash").primaryKey(),
  original: text("original").notNull(),
  createdAt: text("created_at").notNull(),
});

export type Url = InferSelectModel<typeof url>;
