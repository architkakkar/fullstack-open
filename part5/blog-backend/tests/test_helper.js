const Blog = require("../models/blog");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});

  return users.map((user) => user.toJSON());
};

const getToken = async () => {
  const user = {
    username: "testuser",
    password: "Test@123",
  };

  const response = await api
    .post("/api/login")
    .send(user)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  return response.body.token;
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  getToken,
};
