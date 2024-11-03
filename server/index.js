const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const LevelModel = require("./models/Level");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/bananagame")
  .then(() => {
    console.log("Connected to MongoDB");

    // Check if levels collection is empty, then seed
    LevelModel.countDocuments().then((count) => {
      if (count === 0) {
        const levels = [
          { levelname: "Level 1", difficulty: "easy", leveltime: 50 },
          { levelname: "Level 2", difficulty: "medium", leveltime: 20 },
          { levelname: "Level 3", difficulty: "hard", leveltime: 10 },
        ];

        LevelModel.insertMany(levels)
          .then(() => console.log("Difficulty levels seeded"))
          .catch((err) =>
            console.error("Error seeding difficulty levels:", err)
          );
      }
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "Success", user: { email: user.email } }); // Send user email
        } else {
          res.json({ message: "The password is incorrect!" });
        }
      } else {
        res.json({ message: "No record existed!" });
      }
    })
    .catch((err) => res.status(500).json({ message: "An error occurred." }));
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/levels", (req, res) => {
  LevelModel.find({})
    .then((levels) => res.json(levels))
    .catch((err) => res.status(500).json({ message: "Error fetching levels" }));
});

app.put("/updateStats", (req, res) => {
  const { email, isWin, timeTaken } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });

      // Increment the number of games played
      user.gameplayed += 1;

      // Update stats if the game was won
      if (isWin) {
        user.gamesWon += 1;
        user.beststreak += 1; // Increase streak

        // Update best time if the current time is better, or if this is the first time
        if (user.besttime == null || timeTaken > user.besttime) {
          user.besttime = timeTaken;
        }
      }

      // Save updated user stats
      user
        .save()
        .then(() => res.json({ message: "Stats updated successfully", user }))
        .catch((err) =>
          res.status(500).json({ message: "Error updating stats", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Error finding user", error: err })
    );
});

app.get("/user/profile/:email", (req, res) => {
  const { email } = req.params;
  UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Error fetching user data", error: err })
    );
});

app.get('/leaderboard', (req, res) => {
    UserModel.find({})
        .sort({ gamesWon: -1 }) // Sort by games won in descending order
        .limit(5) // Limit to top 5 players
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ message: "Error fetching leaderboard data", error: err }));
});


app.listen(3001, () => {
  console.log("Server running!");
});
