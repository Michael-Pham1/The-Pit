require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://the-pit-sepia.vercel.app", // Replace with your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods if necessary
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers if necessary
  })
);

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
app.use(
  "/api/register",
  cors({
    origin: "https://the-pit-sepia.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
  require("./register")
);
app.use(
  "/api/matchups",
  cors({
    origin: "https://the-pit-sepia.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
  require("./matchups")
);
app.use(
  "/api/messages",
  cors({
    origin: "https://the-pit-sepia.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
  require("./messages")
);

app.use(
  "/api/users",
  cors({
    origin: "https://the-pit-sepia.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
  require("./users")
);

app.use(
  "/api/animes",
  cors({
    origin: "https://the-pit-sepia.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
  require("./animes")
);
// Export the app for Vercel
module.exports = app;
