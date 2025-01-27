require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.TEST_MONGODB_URI;

mongoose.set("strictQuery", false);

console.log("connecting to:", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to db.");

    const blogSchema = new mongoose.Schema({
      title: String,
      author: String,
      url: String,
      likes: Number,
    });

    const Blog = mongoose.model("Blog", blogSchema);

    const blog = new Blog({
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    });

    return blog.save();
  })
  .then(() => console.log("blog saved."))
  .catch((error) => console.log("error saving note:", error))
  .finally(() => mongoose.connection.close());
