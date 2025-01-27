const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");

const api = supertest(app);

// use `npm test -- --test-name-pattern="all blogs are returned"` to execute single test.
test("all blogs are returned", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, 2);
});

test("blogs have an id field", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogKeys = Object.keys(response.body[0]);

  assert(blogKeys.includes("id"));
});

after(async () => {
  await mongoose.connection.close();
});
