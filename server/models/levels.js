const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
    levelname: { type: String, required: true }
});

const LevelModel = mongoose.model("levels", LevelSchema);
module.exports = LevelModel;