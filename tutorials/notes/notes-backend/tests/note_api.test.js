const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Note = require("../models/note");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

beforeEach(async () => {
  await Note.deleteMany({});

  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();

  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});

describe("note api", () => {
  const api = supertest(app);

  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two notes", async () => {
    const response = await api.get("/api/notes");

    assert.strictEqual(response.body.length, initialNotes.length);
  });

  test("the first note is about HTTP methods", async () => {
    const response = await api.get("/api/notes");
    // execution gets to the next step only after the HTTP request is complete
    // the result of HTTP request is saved in variable response

    const contents = response.body.map((e) => e.content);

    // is the argument truthy
    assert(contents.includes("HTML is easy"));
  });
});

after(async () => {
  await mongoose.connection.close();
});
