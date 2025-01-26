import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import { readFileSync } from "fs";
import https from "https";
import * as path from "path";

dotenv.config({ path: "./config.env" });

const app = express();

// SSL certificate configuration
const options = {
  key: readFileSync(path.join("CA", "server-key.pem")),
  cert: readFileSync(path.join("CA", "server-cert.pem")),
};

// Replace <db_password> in the connection string with the password from the environment variable
// const DB = process.env.DATABASE.replace(
//   "<db_password>",
//   process.env.DATABASE_PASSWORD
// );

// Connect to MongoDB using Mongoose
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     ssl: true, // Enable SSL for MongoDB Atlas
//   })
//   .then(() => {
//     console.log("Successfully connected to MongoDB!");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err.message);
//   });
mongoose.connect(
  "mongodb://127.0.0.1:27017/test?socketTimeoutMS=1000&bufferCommands=false&authSource=otherdb"
);

// Express routes
app.get("/", (req, res) => {
  res.send("Welcome to the Electronic Election App!");
});

app.use("/", (req, res) => {
  res.send("Welcome");
});

// Start the HTTPS server
const ssl_server = https.createServer(options, app);
ssl_server.listen(3000, () => {
  console.log("Your secure server is running on port 3000");
});
