const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

/* 
  user(String): user id
  text(String): message content
  matchupId(String): matchup id
*/
router.post("/", async (req, res) => {
  try {
    const { user, text, matchupId } = req.body; 
    if (!user || !text || !matchupId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const matchup = await Message.findById(matchupId);
    if (!matchup) {
      return res.status(404).json({ message: "Matchup not found" });
    }

    const newMessage = new Message({ text: text, matchupId: matchupId, createrId: user, createdAt: new Date()});
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Messages POST error", error: error.message });
  }
});

router.get("/:matchupId", async (req, res) => {
  try {
    const { matchupId } = req.params;
    const messages = await Message.find({ matchupId: matchupId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Messages GET :matchupId error", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Messages GET  error", error: error.message });
  }
});


module.exports = router;
