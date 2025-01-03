require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routers/user.router'));
app.use('/api/games', require('./routers/game.router'));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
