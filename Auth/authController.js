import jwt from "jsonwebtoken";
import AppError from "../utils/appError";
import User from "../src/user/userModel";
const signToken = (id) => {
  return jwt.sign({ id }, "I-like-AB-MI-RI-VA-BUT-SUPREME-RADHA-KRISHN", {
    expiresIn: "90d",
  });
};
exports.signup = async (req, res, next) => {
  try {
    // Validate role to prevent unauthorized admin registration
    if (req.body.role && req.body.role === "admin") {
      return next(new AppError("Unauthorized role assignment!", 403));
    }
    const { name, email, password } = req.body;

    // Create a new user

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password,
    });
    // Generate a token for the new user
    const token = signToken(newUser._id);

    // Respond with success
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    // Handle duplicate email error
    if (err.code === 11000) {
      return next(
        new AppError("Email already in use. Please use another email.", 400)
      );
    }

    // Handle validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((el) => el.message);
      return next(
        new AppError(`Invalid input data: ${messages.join(". ")}`, 400)
      );
    }

    // Handle other unexpected errors
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError("Please provide email and password.", 400));
    }

    // 2) Check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password");

    // If the user doesn't exist or the password is incorrect
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password.", 401));
    }

    // 3) If everything is ok, send token to the client
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    // Handle unexpected errors
    next(err);
  }
};
