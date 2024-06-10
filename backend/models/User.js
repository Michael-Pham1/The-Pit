const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    uid: { type: String, required: true },
    displayPicture: { type: String },

});

module.exports = mongoose.model('User', UserSchema);

