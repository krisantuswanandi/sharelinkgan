import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./database/schema.ts",
  out: "./database/migrations",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.NUXT_DATABASE_URL!,
  },
} satisfies Config;
