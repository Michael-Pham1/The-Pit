// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const uri = "mongodb+srv://atsmsites:atsmloginpassword99!@animematchup.iyuiomy.mongodb.net/?retryWrites=true&w=majority&appName=AnimeMatchup"

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Server listening on http://localhost:${port}`)))
  .catch(err => console.error("cant connect to mongo", err));

// Use Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/anime', require('./routes/animes'));
app.use('/api/matchups', require('./routes/matchups'));

app.listen(3000, () => {
  console.log('Server is running on port 5000');
});