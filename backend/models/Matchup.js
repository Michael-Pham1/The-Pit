// backend/models/Matchup.js
const mongoose = require('mongoose');
const MatchupSchema = new mongoose.Schema({
  anime1: { type: String, required: true },
  anime2: { type: String, required: true },
  result: { type: String },
});
module.exports = mongoose.model('Matchup', MatchupSchema);
