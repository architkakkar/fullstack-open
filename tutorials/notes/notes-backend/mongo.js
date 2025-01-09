const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

// ykx79IdnWJwJlgWq
const url = `mongodb+srv://fullstack:${password}@cluster0.cjkm5.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// Create a new note
/*
const note = new Note({
  content: "GET and POST are the most important methods of HTTP protocol",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  
  mongoose.connection.close();
});
*/

// Fetch all notes
/*
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
*/

// Fetch all notes with important field set to false
Note.find({ important: false }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
