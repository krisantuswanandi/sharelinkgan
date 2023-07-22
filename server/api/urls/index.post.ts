import { nanoid } from "nanoid";
import { db, schema } from "@/database";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const hash = nanoid(10);

  if (!body.hash) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid URL",
    });
  }

  try {
    await db.insert(schema.url).values({
      hash,
      original: body.hash,
    });
    return { hash };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Shorten URL Failed",
    });
  }
});
