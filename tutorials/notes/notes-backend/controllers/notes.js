/*
 * No need to worry about error handling for async functions
 * `express-async-errors` library handles everything under the hood
 * if error occurs, the execution is automatically passed to error-handling middleware
 */
const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.post("/", async (request, response) => {
  const { content, important, userId } = request.body;

  const user = await User.findById(userId);
  if (!user) {
    return response.status(404).json({ error: "user not found" });
  }

  const note = new Note({
    content,
    important: important || false,
    user: user.id,
  });

  const savedNote = await note.save();
  user.notes = [...user.notes, savedNote.id];
  await user.save();

  response.status(201).json(savedNote);
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
