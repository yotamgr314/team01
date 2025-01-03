// File: backend/routers/user.router.js
const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    startTriviaGame
} = require('../controllers/user.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);
router.get('/trivia/start', startTriviaGame);

module.exports = router;

//---------------------------------------------------------------
