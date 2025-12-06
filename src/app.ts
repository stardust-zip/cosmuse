import { NextFunction, Request, Response } from "express";
import express from "express";
import * as postController from "./controllers/post.controller.js";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import { openApiDocument } from "./docs/openapi.js";
import swaggerUi from "swagger-ui-express";

extendZodWithOpenApi(z);

const app = express();

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} request to http://${req.hostname}${req.url}`);
  next();
};

app.use(requestLogger);
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Cosmuse!",
  });
});

app.get("/posts", postController.getAllPosts);
app.get("/posts/:id", postController.getPostById);
app.post("/posts", postController.createPost);
app.put("/posts/:id", postController.updatePost);
app.delete("/posts/:id", postController.deletePost);

export default app;
