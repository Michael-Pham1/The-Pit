const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  matchupId: { type: String, required: true },
  creatorId: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Message", MessageSchema);
