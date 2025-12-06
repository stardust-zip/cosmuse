import * as postService from "../services/post.service.js";

// GET
const getAllPosts = (req, res) => {
  const posts = postService.getAllPosts();
  if (!posts) {
    return res.status(404).json({ error: "Not found." });
  }
  res.status(200).json(posts);
};

const getPostById = (req, res) => {
  const post = postService.getPostById(req.params.id);

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

  const newPost = postService.createPost(req.body.title, req.body.content);

  if (!newPost) {
    return res.status(400).json({ error: "Failed to create post." });
  }
  res.status(201).json(newPost);
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

  const updatedPost = postService.updatePost(
    req.body.title,
    req.body.content,
    req.params.id,
  );

  if (!updatedPost) {
    return res.status(404).json({ message: "Not found!" });
  }

  res.status(200).json({ message: "Update sucess!" });
};

// DELETE
const deletePost = (req, res) => {
  const deleted = postService.deletePost(req.params.id);

  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Not found." });
  }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
