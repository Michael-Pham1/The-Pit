// backend/models/Anime.js
const mongoose = require('mongoose');
const AnimeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});
module.exports = mongoose.model('Anime', AnimeSchema);
