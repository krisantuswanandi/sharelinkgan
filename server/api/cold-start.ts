// random query to trigger cold start
import { eq } from "drizzle-orm";
import { db, schema } from "@/database";

export default defineCachedEventHandler(
  async () => {
    try {
      await db.select().from(schema.url).where(eq(schema.url.hash, "abc"));

      return { message: "ok" };
    } catch (error) {
      console.error(error);
      throw createError({
        statusCode: 500,
        statusMessage: "Shorten URL Failed",
      });
    }
  },
  { maxAge: 5 * 60 } // ignore for 5 minutes
);
