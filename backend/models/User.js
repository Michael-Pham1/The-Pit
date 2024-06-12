const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    uid: { type: String, required: true },
    displayPicture: { type: String },
    bio: { type: String, required: true },
    created: { type: Date, required: true },
    win: { type: String, required: true },
    lose: { type: String, required: true }

});

module.exports = mongoose.model('User', UserSchema);