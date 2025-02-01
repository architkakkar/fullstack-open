const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // this ensures the uniqueness of username
    minlength: [3, "Username must be at least 3 characters long"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9]+$/.test(v); // only allows alphanumeric characters
      },
      message: (props) =>
        `${props.value} is not a valid username! Only alphanumeric characters are allowed.`,
    },
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isStrongPassword(v, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        });
      },
      message: "Password is not strong enough",
    },
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // the passwordHash should not be revealed
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
