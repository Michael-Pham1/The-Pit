const mongoose = require("mongoose");

const MatchupSchema = new mongoose.Schema({
  character1: { type: String, required: true },
  character2: { type: String, required: true },
  imageCharacter1: { type: Buffer, required: true },
  imageCharacter2: { type: Buffer, required: true },
  vote1: { type: Number, default: 0 },
  vote2: { type: Number, default: 0 },
  result: { type: Boolean },
  createrId: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Matchup", MatchupSchema);