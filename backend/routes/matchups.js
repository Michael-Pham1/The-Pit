// backend/routes/matchups.js
const express = require('express');
const router = express.Router();
const Matchup = require('../models/Matchup');

// Create a new matchup
router.post('/', async (req, res) => {
  const { anime1, anime2, result } = req.body;
  try {
    const newMatchup = new Matchup({ anime1, anime2, result });
    await newMatchup.save();
    res.json(newMatchup);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send('Server error!');
  }
});

// Get all matchups
router.get('/', async (req, res) => {
  try {
    const matchups = await Matchup.find();
    res.json(matchups);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send('Server error');
  }
});

module.exports = router;
