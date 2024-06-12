const express = require('express');
const router = express.Router();
const Matchup = require('../models/Matchup');
const multer  = require('multer');
const fs = require('fs');

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Create a new matchup
router.post('/', upload.fields([{ name: 'imageCharacter1', maxCount: 1 }, { name: 'imageCharacter2', maxCount: 1 }]), async (req, res) => {
 
  // console.log('match POST request');
  // console.log(req);
  const { character1, character2, vote1, vote2, result, creatorId, createDate } = req.body; 
  const imageCharacter1 = req.files['imageCharacter1'] ? req.files['imageCharacter1'][0] : null;
const imageCharacter2 = req.files['imageCharacter2'] ? req.files['imageCharacter2'][0] : null;

  console.log('image information::+======================');
  console.log(imageCharacter1);
  console.log(imageCharacter2);
  try {
   const newMatchup = new Matchup({
  character1,
  character2,
  imageCharacter1: imageCharacter1 ? { data: imageCharacter1.buffer, contentType: imageCharacter1.mimetype } : undefined,
  imageCharacter2: imageCharacter2 ? { data: imageCharacter2.buffer, contentType: imageCharacter2.mimetype } : undefined,
  vote1,
  vote2,
  result,
  creatorId,
  createDate
});

    console.log(newMatchup);
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
    const matchups = await Matchup.find({ creatorId: req.params.id });
    res.json(matchups);
  } catch (err) {
    console.error(err);
    res.status(500).send('Matchups GET user/:id error');
  }
});

router.get('/image/:id', async (req, res) => {
  try {
      const matchup = await Matchup.findById(req.params.id);
      if (matchup && matchup.imageCharacter1 && matchup.imageCharacter1.data) {
          res.set('Content-Type', matchup.imageCharacter1.contentType);
          res.send(matchup.imageCharacter1.data);
      } else {
          res.status(404).send('Image not found');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});

// Example for serving specific character images based on request
router.get('/image/:id/:character', async (req, res) => {
  try {
      const matchup = await Matchup.findById(req.params.id);
      let imageData = null;
      if (req.params.character === '1' && matchup.imageCharacter1) {
          imageData = matchup.imageCharacter1;
      } else if (req.params.character === '2' && matchup.imageCharacter2) {
          imageData = matchup.imageCharacter2;
      }

      if (imageData && imageData.data) {
          res.set('Content-Type', imageData.contentType);
          res.send(imageData.data);
      } else {
          res.status(404).send('Image not found');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});

router.post("/", async (req, res) => {
  try {
    const { user, text, matchupId } = req.body;
    if (!user || !text || !matchupId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newMessage = new Message({ text, matchupId, creatorId: user });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Messages POST error", error: error.message });
  }
});

router.get("/:matchupId", async (req, res) => {
  try {
    const { matchupId } = req.params;
    const messages = await Message.find({ matchupId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Messages GET :matchupId error", error: error.message });
  }
});

router.post('/vote', async (req, res) => {
  const { matchupId, character } = req.body;
  try {
    const matchup = await Matchup.findById(matchupId);
    if (!matchup) {
      return res.status(404).json({ message: 'Matchup not found' });
    }

    if (character === 1) {
      matchup.vote1 += 1;
    } else if (character === 2) {
      matchup.vote2 += 1;
    } else {
      return res.status(400).json({ message: 'Invalid character' });
    }

    await matchup.save();
    res.json({ vote1: matchup.vote1, vote2: matchup.vote2 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
