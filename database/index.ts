import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

export * as schema from "./schema";

const config = useRuntimeConfig()

const connection = connect({
  host: config.databaseHost,
  username: config.databaseUsername,
  password: config.databasePassword,
});

export const db = drizzle(connection);
