import express from "express";
import db from "./database.js";

const app = express();
const port = 8282;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Cosmuse!",
  });
});

app.get("/posts", (req, res) => {
  const posts = db.prepare("SELECT * FROM posts").all();
  res.json(posts);
});

app.get("/post/:id", (req, res) => {
  const post = db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .get(req.params.id);
  res.json(post);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
