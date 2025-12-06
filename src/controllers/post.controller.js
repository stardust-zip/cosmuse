import db from "../database.js";

// GET
const getAllPosts = (req, res) => {
  const posts = db.prepare("SELECT * FROM posts").all();
  if (!posts) {
    return res.status(404).json({ error: "Not found." });
  }
  res.status(200).json(posts);
};

const getPostById = (req, res) => {
  const post = db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .get(req.params.id);

  if (!post) {
    return res.status(404).json({ error: "Not found." });
  }
  res.status(200).json(post);
};

// POST
const createPost = (req, res) => {
  if (
    !req.body.title ||
    typeof req.body.title != "string" ||
    req.body.title === ""
  ) {
    return res.status(400).json({ error: "Title is required." });
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
};

// PUT
const updatePost = (req, res) => {
  if (
    !req.body.title ||
    typeof req.body.title != "string" ||
    req.body.title === ""
  ) {
    return res.status(400).json({ error: "Title is required" });
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
};

// DELETE
const deletePost = (req, res) => {
  const info = db.prepare("DELETE FROM posts WHERE id = ?").run(req.params.id);

  if (info.changes === 1) {
    res.status(204).json({ mesage: "sucess" });
  } else {
    res.status(404).json({ message: "Not found." });
  }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
