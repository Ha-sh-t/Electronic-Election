// models/userModel.js
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Please provide a valid email address",
    },
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be less than 50 characters long"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [100, "Password must be less than 100 characters long"],
  },
});

// Export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
