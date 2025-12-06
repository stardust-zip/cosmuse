import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import {
  createPostSchema,
  PostSchema,
  PostParamsSchema,
  updatePostSchema,
} from "../schemas/post.schema";
import z from "zod";

export const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  path: "/posts",
  description: "Get all posts.",
  summary: "get all posts",
  responses: {
    200: {
      description: "Get all post successfully",
      content: {
        "application/json": {
          schema: z.array(PostSchema),
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/posts/{id}",
  description: "Get a post by it's id",
  summary: "Get post by id",
  request: {
    params: PostParamsSchema,
  },
  responses: {
    200: {
      description: "Found the post",
      content: {
        "application/json": {
          schema: PostSchema,
        },
      },
    },
    404: {
      description: "Not found.",
    },
  },
});

registry.register("Post", createPostSchema);
registry.registerPath({
  method: "post",
  path: "/posts",
  description: "Create a new blog post",
  summary: "Create Post",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createPostSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Post created successfully",
      content: {
        "application/json": {
          schema: PostSchema,
        },
      },
    },
    400: {
      description: "Validation Error",
    },
  },
});

registry.register("Put", updatePostSchema);
registry.registerPath({
  method: "put",
  path: "/posts/{id}",
  description: "update a post based on id",
  summary: "Update Post",
  request: {
    params: PostParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: updatePostSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Post updated successfully",
      content: {
        "application/json": {
          schema: PostSchema,
        },
      },
    },
    400: {
      description: "Post update failed",
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/posts/{id}",
  description: "Delete a post based on the id.",
  summary: "Delete Post",
  request: {
    params: PostParamsSchema,
  },
  responses: {
    204: {
      description: "Post deleted successfully",
    },
    400: {
      description: "Failed to delete post",
    },
    404: {
      description: "Post not found",
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Cosmuse Blog API",
    version: "1.0.0",
    description: "API for cosmuse",
  },
  servers: [{ url: "http://localhost:8282" }],
});
