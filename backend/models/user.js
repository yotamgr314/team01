// File: backend/models/user.js
const mongoose = require('mongoose');
const Game = require('./game');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    games: [Game.schema]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
