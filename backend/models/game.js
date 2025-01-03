// File: backend/models/game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    correctAnswers: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    playedAt: { type: Date, default: Date.now }
}, { _id: false });

module.exports = mongoose.model('Game', gameSchema);

