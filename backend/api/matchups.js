const express = require('express');
const router = express.Router();
const Matchup = require('../models/Matchup');

// Create a new matchup
router.post('/', async (req, res) => {
  const { character1, character2, imageCharacter1, imageCharacter2, vote1, vote2, result, createrId, createDate } = req.body;
  try {
    const newMatchup = new Matchup({ character1, character2, imageCharacter1, imageCharacter2, vote1, vote2, result, createrId, createDate});
    await newMatchup.save();
    res.json(newMatchup);
  } catch (err) {
    console.error(err);
    res.status(500).send("Matchups POST error!");
  }
});

// Get all matchups
router.get('/', async (req, res) => {
  try {
    const matchups = await Matchup.find();
    res.json(matchups);
  } catch (err) {
    console.error(err);
    res.status(500).send("Matchups GET all error");
  }
});

//Get matchup by matchup id
router.get('/:id', async (req, res) => {
  try {
    const matchup = await Matchup.findById(req.params.id);
    res.json(matchup);
  } catch (err) {
    console.error(err);
    res.status(500).send('Matchups GET matchup:id error');
  }
});

//Get matchup by user id
router.get('/user/:id', async (req, res) => {
  try {
    const matchups = await Matchup.find({ createrId: req.params.id });
    res.json(matchups);
  } catch (err) {
    console.error(err);
    res.status(500).send('Matchups GET user/:id error');
  }
});

module.exports = router;