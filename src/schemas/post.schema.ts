import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .openapi({ example: "My First Post" }),
  content: z
    .string()
    .optional()
    .openapi({ example: "My first post's content." }),
});

export const updatePostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .openapi({ example: "Updated Title" }),
  content: z.string().optional().openapi({ example: "Updated Content" }),
});
