//---------------------------------------------------------------

// File: backend/models/game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    questions: [
        {
            question: { type: String, required: true },
            correctAnswer: { type: String, required: true },
            incorrectAnswers: { type: [String], required: true },
            userAnswer: { type: String }
        }
    ],
    correctAnswers: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 10 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);

//---------------------------------------------------------------

