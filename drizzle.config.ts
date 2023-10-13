import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./database/schema.ts",
  out: "./database/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.NUXT_DATABASE_URL!,
    authToken: process.env.NUXT_DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
