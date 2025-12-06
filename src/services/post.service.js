import db from "../database.js";

export const getAllPosts = () => {
  const posts = db.prepare("SELECT * FROM posts").all();
  return posts;
};

export const getPostById = (id) => {
  const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
  return post;
};

export const createPost = (title, content) => {
  const info = db
    .prepare("INSERT INTO posts (title, content) VALUES (?, ?)")
    .run(title, content);

  return info;
};

export const updatePost = (title, content, id) => {
  const info = db
    .prepare("UPDATE posts SET title = ?, content = ? WHERE id = ?")
    .run(title, content, id);

  return info;
};

export const deletePost = (id) => {
  const info = db.prepare("DELETE FROM posts WHERE id = ?").run(id);

  return info;
};
