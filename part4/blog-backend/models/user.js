const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9]+$/.test(v); // only allows alphanumeric characters
      },
      message: (props) =>
        `${props.value} is not a valid username! Only alphanumeric characters are allowed.`,
    },
  },
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

mongoose.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
