import { prisma } from "../prisma.js";

export const getAllPosts = async () => {
  return await prisma.post.findMany();
};

export const getPostById = async (id: number) => {
  return await prisma.post.findUnique({ where: { id: Number(id) } });
};

export const createPost = async (title: string, content: string) => {
  return await prisma.post.create({
    data: {
      title,
      content,
    },
  });
};

export const updatePost = async (
  title: string,
  content: string,
  id: number,
) => {
  try {
    return await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content },
    });
  } catch (err) {
    return null;
  }
};

export const deletePost = async (id: number) => {
  try {
    return await prisma.post.delete({
      where: { id: Number(id) },
    });
  } catch (err) {
    return null;
  }
};
