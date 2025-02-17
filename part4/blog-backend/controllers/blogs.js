const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor, tokenExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", tokenExtractor, userExtractor, async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: "title and url are required" });
  }

  const { title, author, url, likes = 0 } = request.body;

  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = [...user.blogs, savedBlog.id];
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", tokenExtractor, userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== user.id) {
    return response.status(401).json({ error: "invalid user" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  });

  response.status(200).json(result);
});

module.exports = blogsRouter;
