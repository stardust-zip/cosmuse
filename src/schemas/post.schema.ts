import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(), // Why not nullable
});

export const updatePostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
});
