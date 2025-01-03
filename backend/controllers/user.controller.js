// Update: backend/controllers/user.controller.js
const User = require('../models/user');
const { fetchTriviaQuestions } = require('../services/trivia.service');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { email, username, password, avatar } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            email,
            username,
            password,
            avatar
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { username, avatar } = req.body;
        user.username = username || user.username;
        user.avatar = avatar || user.avatar;

        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Start a new trivia game
// @route   GET /api/users/trivia/start
// @access  Public
exports.startTriviaGame = async (req, res) => {
    const { category, difficulty } = req.query;

    try {
        // Fetch questions from the trivia service
        const questions = await fetchTriviaQuestions(category, difficulty);

        res.status(200).json({
            message: 'Trivia game started successfully',
            questions
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
