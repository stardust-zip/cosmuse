import { Request, Response } from "express";
import * as postService from "../services/post.service";

// GET
const getAllPosts = async (req: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  if (!posts) {
    return res.status(404).json({ error: "Not found." });
  }
  res.status(200).json(posts);
};

const getPostById = async (req: Request, res: Response) => {
  const post = await postService.getPostById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: "Not found." });
  }
  res.status(200).json(post);
};

// POST
const createPost = async (req: Request, res: Response) => {
  if (
    !req.body.title ||
    typeof req.body.title != "string" ||
    req.body.title === ""
  ) {
    return res.status(400).json({ error: "Title is required." });
  }

  const newPost = await postService.createPost(
    req.body.title,
    req.body.content,
  );

  if (!newPost) {
    return res.status(400).json({ error: "Failed to create post." });
  }
  res.status(201).json(newPost);
};

// PUT
const updatePost = async (req: Request, res: Response) => {
  if (
    !req.body.title ||
    typeof req.body.title != "string" ||
    req.body.title === ""
  ) {
    return res.status(400).json({ error: "Title is required" });
  }

  const updatedPost = await postService.updatePost(
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
const deletePost = async (req: Request, res: Response) => {
  const deleted = await postService.deletePost(req.params.id);

  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Not found." });
  }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
