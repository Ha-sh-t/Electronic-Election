import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Email should be unique
    password: { type: String, required: true }, // Store hashed passwords in production
});

// Create a Mongoose model
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
