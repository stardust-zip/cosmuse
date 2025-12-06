import express from "express";
import * as postController from "./controllers/post.controller.js";

const app = express();

app.use(express.json());

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
