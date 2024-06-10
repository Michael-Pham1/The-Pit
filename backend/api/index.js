require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the application with a failure code
  });

app.get("/", (req, res) => {
  res.send("Root path is working");
});

// Use Routes
app.use("/api/users", require("./users"));
app.use("/api/animes", require("./animes"));
app.use("/api/matchups", require("./matchups"));
app.use("/api/register", require("./register"));
app.use("/api/messages", require("./messages"));

// Export the app for Vercel
module.exports = app;
