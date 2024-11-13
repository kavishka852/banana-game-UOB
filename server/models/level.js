const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
    levelname: { type: String, required: true },
    difficulty: { type: String, required: true, unique: true }, // Add difficulty field, e.g., "easy", "medium", "hard"
    leveltime: { type: Number, required: true } // Required to ensure all levels have an assigned time
});

const LevelModel = mongoose.model("levels", LevelSchema);
module.exports = LevelModel;
