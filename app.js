import express from "express";
import db from "./database.js";

const app = express();
const port = 8282;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Cosmuse!",
  });
});

// GET
app.get("/posts", (req, res) => {
  const posts = db.prepare("SELECT * FROM posts").all();
  res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .get(req.params.id);
  res.status(200).json(post);
});

// POST
app.post("/posts", (req, res) => {
  if (
    !req.body.title ||
    typeof req.body.title != "string" ||
    req.body.title === ""
  ) {
    res.status(400).json({ error: "Title is required." });
  }

  const title = req.body.title;
  const content = req.body.content;

  const info = db
    .prepare("INSERT INTO posts (title, content) VALUES (?, ?)")
    .run(title, content);

  if (info.changes === 1) {
    res.status(201).json({
      id: info.lastInsertRowid,
      title: title,
      content: content,
    });
  } else {
    res.status(400).json({
      message: "Failed.",
    });
  }
});

// PUT
app.put("/posts/:id", (req, res) => {
  if (
    !req.body.title ||
    typeof req.body.title != "string" ||
    req.body.title === ""
  ) {
    res.status(400).json({ error: "Title is required" });
  }
  const title = req.body.title;
  const content = req.body.content;

  const info = db
    .prepare("UPDATE posts SET title = ?, content = ? WHERE id = ?")
    .run(title, content, req.params.id);

  if (info.changes === 1) {
    res.status(200).json({
      id: req.params.id,
      title: title,
      content: content,
    });
  } else {
    res.status(404).json({
      message: "ID not exists",
    });
  }
});

// DELETE
app.delete("/posts/:id", (req, res) => {
  const info = db.prepare("DELETE FROM posts WHERE id = ?").run(req.params.id);

  if (info.changes === 1) {
    res.status(204).json({ mesage: "sucess" });
  } else {
    res.status(404).json({ message: "Not found." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
