const bcrypt = require("bcrypt");
const validator = require("validator");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const allUsers = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    likes: 1,
    url: 1,
  });

  response.status(200).json(allUsers);
});

usersRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  const passwordOptions = {
    minLength: 3,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  };

  if (!validator.isStrongPassword(password, passwordOptions)) {
    return response.status(400).json({
      error: "password is not strong enough",
    });
  }

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
