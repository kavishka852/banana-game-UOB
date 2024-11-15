const express = require("express");
const LevelModel = require("../models/Level");

const router = express.Router();

// Fetch Levels
router.get("/", async (req, res) => {
  try {
    const levels = await LevelModel.find({});
    res.json(levels);
  } catch (err) {
    res.status(500).json({ message: "Error fetching levels" });
  }
});

module.exports = router;
