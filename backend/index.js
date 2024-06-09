require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); 

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/anime', require('./routes/animes'));
app.use('/api/matchups', require('./routes/matchups'));

app.get('/test-db', async (req, res) => {
  try {
    const testData = new (mongoose.model('Test', new mongoose.Schema({ name: String })))({ name: 'Test Entry' });
    await testData.save();
    res.json({ message: 'Data saved successfully', data: testData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving data' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
