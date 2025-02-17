const express = require("express");
const UserModel = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get User Profile
router.get("/profile/:email", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.params.email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching user data", error: err });
  }
});

// Update User Stats
// router.put("/updateStats", async (req, res) => {
//     const { email, isWin, timeTaken } = req.body;
  
//     try {
//       const user = await UserModel.findOne({ email });
//       if (!user) return res.status(404).json({ message: "User not found" });
  
//       user.gameplayed += 1;
  
//       if (isWin) {
//         user.gamesWon += 1;
//         user.currentStreak = user.currentStreak ? user.currentStreak + 1 : 1;
  
//         // Update best streak only if the current streak is greater than the best streak
//         if (user.currentStreak > user.beststreak) {
//           user.beststreak = user.currentStreak;
//         }
  
//         // Update best time if the time taken is greater than the current best time
//         if (user.besttime == null || timeTaken > user.besttime) {
//           user.besttime = timeTaken;
//         }
//       } else {
//         // Reset current streak on a loss
//         user.currentStreak = 0;
//       }
  
//       await user.save();
//       res.json({ message: "Stats updated successfully", user });
//     } catch (err) {
//       res.status(500).json({ message: "Error updating stats", error: err });
//     }
//   });
  // Update User Stats
router.put("/updateStats", async (req, res) => {
  const { email, isWin, timeTaken } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.gameplayed += 1;

    if (isWin) {
      user.gamesWon += 1;
      user.currentStreak = user.currentStreak ? user.currentStreak + 1 : 1;

      // Update best streak only if the current streak is greater than the best streak
      if (user.currentStreak > user.beststreak) {
        user.beststreak = user.currentStreak;
      }

      // Update best time only if the current time is less than the best time
      if (timeTaken > user.besttime) {
        user.besttime = timeTaken;
      }
    } else {
      // Reset current streak on a loss
      user.currentStreak = 0;
    }

    await user.save();
    res.json({ message: "Stats updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating stats", error: err });
  }
});


// Get Leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const users = await UserModel.find().sort({ gamesWon: -1 }).limit(5);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaderboard", error: err });
  }
});

//upadte user's coins 
router.put("/updateCoins", async (req, res) => {
  const { email, coinsEarned } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.totalCoins += parseInt(coinsEarned, 10); // Update the total coins
    await user.save();

    res.json({ message: "Coins updated successfully", totalCoins: user.totalCoins });
  } catch (error) {
    res.status(500).json({ message: "Error updating coins", error });
  }
});

// Get Logged-in User's Total Coins
router.get("/totalCoins", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ totalCoins: user.totalCoins });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total coins", error });
  }
});



module.exports = router;
