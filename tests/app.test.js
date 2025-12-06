import { describe, it, expect, beforAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("GET /posts", () => {
  it("should return a list of all posts", async () => {
    // request(app) creates afake server just for this request
    const res = await request(app).get("/posts");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("POST /posts", () => {
  it("should create a new post", async () => {
    const newPost = {
      title: "Test Title 2",
      content: "Test Content 2",
    };
    const res = await request(app).post("/posts").send(newPost);

    expect(res.status).toBe(201);
    expect(res.body.id).toBe(2);
    expect(res.body.title).toBe("Test Title 2");

    const check = await request(app).get(`/posts/${res.body.id}`);
    expect(check.status).toBe(200);
    expect(check.body.content).toBe(res.body.content);
  });

  it("should fail to creat a new post without title", async () => {
    const newPost = {
      content: "New Content without Title.",
    };

    const res = await request(app).post("/posts").send(newPost);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Title is required.");
  });
});

describe("PUT /posts", () => {
  it("should successfully modify the default post", async () => {
    const updatedPost = {
      title: "Modfied Title",
      content: "Modified Content",
    };

    const res = await request(app).put("/posts/1").send(updatedPost);
    const check = await request(app).get("/posts/1");

    expect(check.body.title).toBe(updatedPost.title);
  });

  it("should fail to update the default post without title", async () => {
    const updatedPost = {
      content: "Updated Content without Title.",
    };

    const res = await request(app).put("/posts/1").send(updatedPost);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Title is required");
  });
});

describe("DELETE /posts", () => {
  it("should sucessfully delete the default post", async () => {
    const res = await request(app).delete("/posts/1");
    const check = await request(app).get("/posts/1");

    expect(check.status).toBe(404);
  });
});
