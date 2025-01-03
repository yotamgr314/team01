// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    games: [gameSchema] // Embedded games
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
