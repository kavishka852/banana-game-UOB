const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gameplayed: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    beststreak: { type: Number, default: 0 },
    besttime: { type: Number, default: Infinity }, // Default to Infinity to track minimum time
    currentStreak: { type: Number, default: 0 }, // Add this field to track current streak
    rank: { type: Number, default: 0 },
    totalCoins: { type: Number, default: 0 }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
