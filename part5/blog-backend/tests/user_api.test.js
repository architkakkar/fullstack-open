const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

describe("user auth test", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("Test@123", 10);

    const newUser = new User({
      name: "Test User",
      username: "testuser",
      passwordHash,
    });

    await newUser.save();
  });

  test("user creation fails if invalid user is failed with proper status code and message", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "John F.",
      password: "Asd@2134",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });
});

after(async () => {
  mongoose.connection.close();
});
