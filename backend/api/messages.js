const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/", async (req, res) => {
  console.log("POST /api/messages called");
  try {
    const { user, text, matchupId } = req.body;
    if (!user || !text || !matchupId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newMessage = new Message({ text: text, matchupId: matchupId, creatorId: user, createdAt: new Date()});
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
