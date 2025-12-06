import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);

export const PostSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    title: z.string().openapi({ example: "My Title" }),
    content: z.string().openapi({ example: "My Content" }),
  })
  .openapi("Post");

export const PostParamsSchema = z.object({
  id: z
    .string()
    .transform((val) => Number(val))
    .openapi({
      param: {
        name: "id",
        in: "path", // tells openapi this is in the URL, not the body
      },
      example: "1",
    }),
});

export const createPostSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .openapi({ example: "My First Post" }),
    content: z
      .string()
      .optional()
      .openapi({ example: "My first post's content." }),
  })
  .openapi("CreatePost");

export const updatePostSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .openapi({ example: "Updated Title" }),
    content: z.string().optional().openapi({ example: "Updated Content" }),
  })
  .openapi("UpdatePost");
