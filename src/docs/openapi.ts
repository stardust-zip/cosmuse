import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { createPostSchema } from "../schemas/post.schema";
import { OpenAPIGenerator } from "@asteasolutions/zod-to-openapi/dist/openapi-generator";

export const registry = new OpenAPIRegistry();
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
          schema: createPostSchema, // TODO: make a separete 'ResponseSchema' with ID
        },
      },
    },
    400: {
      description: "Validation Error",
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
