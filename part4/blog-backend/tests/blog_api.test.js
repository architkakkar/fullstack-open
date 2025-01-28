const { test, after, beforeEach, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

// use `npm test -- --test-name-pattern="all blogs are returned"` to execute single test.
test("all blogs are returned", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("blogs have an id field", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogKeys = Object.keys(response.body[0]);

  assert(blogKeys.includes("id"));
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  assert(titles.includes(newBlog.title));
});

test("should default likes property to 0 if missing", async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("blog with title or url is not added", async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    likes: 10,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test("a valid blog can be deleted", async () => {
  const blogAtStart = await helper.blogsInDb();
  const blogToDelete = blogAtStart[0];

  assert(blogToDelete);

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogAtEnd.length, blogAtStart.length - 1);

  const ids = blogAtEnd.map((i) => i.id);
  assert(!ids.includes(blogToDelete.id));
});

test("blog details can be updated", async () => {
  const blogAtStart = await helper.blogsInDb();
  const blogToUpdate = blogAtStart[0];

  const updatedBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: 20,
  };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 20);

  const blogAEnd = await helper.blogsInDb();
  const updatedBlogFromDb = blogsAtEnd.find(
    (blog) => blog.id === blogToDelete.id
  );

  assert.equal(updatedBlogFromDb.likes, 20);
});

after(async () => {
  await mongoose.connection.close();
});
