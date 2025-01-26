require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.TEST_MONGODB_URI;

mongoose.set("strictQuery", false);

console.log("connecting to: ", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to DB.");

    const noteSchema = new mongoose.Schema({
      content: String,
      important: Boolean,
    });

    const Note = mongoose.model("Note", noteSchema);

    const note = new Note({
      content: "this note is stored in test db.",
      important: false,
    });

    return note.save();
  })
  .then(() => console.log("note saved."))
  .catch((error) => console.error("error saving note", error))
  .finally(() => mongoose.connection.close());
