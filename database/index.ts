import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export * as schema from "./schema";

const config = useRuntimeConfig();

const client = createClient({
  url: config.databaseUrl,
  authToken: config.databaseAuthToken,
});

export const db = drizzle(client);
