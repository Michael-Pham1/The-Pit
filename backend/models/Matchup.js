// const mongoose = require("mongoose");

// const MatchupSchema = new mongoose.Schema({
//   character1: { type: String, required: true },
//   character2: { type: String, required: true },
//   imageCharacter1: { type: Buffer },
//   imageCharacter2: { type: Buffer },
//   vote1: { type: Number, default: 0 },
//   vote2: { type: Number, default: 0 },
//   result: { type: Boolean },
//   creatorId: { type: String, required: true },
//   createDate: { type: Date, default: Date.now },
// });
// module.exports = mongoose.model("Matchup", MatchupSchema);

const mongoose = require("mongoose");

const MatchupSchema = new mongoose.Schema({
  character1: { type: String, required: true },
  character2: { type: String, required: true },
  imageCharacter1: {
    data: { type: Buffer },
    contentType: { type: String }
  },
  imageCharacter2: {
    data: { type: Buffer },
    contentType: { type: String }
  },
  vote1: { type: Number, default: 0 },
  vote2: { type: Number, default: 0 },
  result: { type: Boolean,  default: null},
  creatorId: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Matchup", MatchupSchema);
