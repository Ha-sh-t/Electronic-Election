import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://777harshitkumar:38BN4nwzcBGqmJbR@cluster0.bwecn.mongodb.net/<dbname>?retryWrites=true&w=majority&tls=true",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
