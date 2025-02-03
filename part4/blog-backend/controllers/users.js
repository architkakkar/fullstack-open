const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const allUsers = await User.find({});

  response.status(200).json(allUsers);
});

usersRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await newUser.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
