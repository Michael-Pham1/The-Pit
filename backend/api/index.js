require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors());

// connect to mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });

app.get("/", (req, res) => {
  res.send("Root path is working");
});

// use all the routes
app.use('/api/users', require('./users'));
app.use('/api/anime', require('./animes'));
app.use('/api/matchups', require('./matchups'));
app.use('/api/register', require('./register'));
app.use('/api/messages', require('./messages')); 

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
