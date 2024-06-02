// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); 

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/AnimeMatchup')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/anime', require('./routes/animes'));
app.use('/api/matchups', require('./routes/matchups'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
