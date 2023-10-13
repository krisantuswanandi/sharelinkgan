import { eq } from "drizzle-orm";
import { db, schema } from "@/database";
import { Url } from "@/database/schema";

export default defineEventHandler(async (event) => {
  const hash = event.context.params?.hash;

  if (!hash) {
    return sendRedirect(event, "/");
  }

  try {
    const url: Url[] = await db
      .select()
      .from(schema.url)
      .where(eq(schema.url.hash, hash));

    if (url.length !== 1) {
      return sendRedirect(event, "/");
    }

    return sendRedirect(event, `/#${url[0].original}`);
  } catch (error) {
    console.error(error);
    return sendRedirect(event, "/");
  }
});
