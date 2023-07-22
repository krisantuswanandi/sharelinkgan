import { InferModel } from "drizzle-orm";
import { mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";

export const url = mysqlTable("url", {
  id: serial("id").primaryKey(),
  hash: varchar("hash", { length: 10 }).unique(),
  original: text("original"),
});

export type Url = InferModel<typeof url, "select">;