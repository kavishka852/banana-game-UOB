// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const UserModel = require("./models/User");
// const LevelModel = require("./models/Level");
// require("dotenv").config();

// const app = express();
// const PORT = 3001;

// app.use(express.json());
// app.use(cors());

// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


// mongoose
//   .connect("mongodb://127.0.0.1:27017/bananagame")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

//   app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
    
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }
    
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       return res.status(400).json({ message: "Incorrect password" });
//     }
  
//     // Generate JWT token
//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET_KEY, { expiresIn: "1h" });
//     res.status(200).json({ message: "Success", token, user });
//   });
  
  

//   app.post("/register", async (req, res) => {
//     const { email, password, name } = req.body;
  
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered" });
//     }
  
//     const hashedPassword = await bcrypt.hash(password, 10);
  
//     const newUser = new UserModel({ email, password: hashedPassword, name });
//     await newUser.save();
  
//     res.status(201).json({ message: "User created successfully" });
//   });
  
// // Middleware to verify JWT
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(403).json({ message: "No token provided" });

//   jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
//     if (err) return res.status(401).json({ message: "Unauthorized" });
//     req.user = decoded;
//     next();
//   });
// };

// app.get("/levels", (req, res) => {
//   LevelModel.find({})
//     .then((levels) => res.json(levels))
//     .catch((err) => res.status(500).json({ message: "Error fetching levels" }));
// });

// app.put("/updateStats", (req, res) => {
//   const { email, isWin, timeTaken } = req.body;

//   UserModel.findOne({ email })
//     .then((user) => {
//       if (!user) return res.status(404).json({ message: "User not found" });

//       // Increment the number of games played
//       user.gameplayed += 1;

//       // Update stats if the game was won
//       if (isWin) {
//         user.gamesWon += 1;

//         // If the user won the game, increase streak; if the previous streak was reset (because of a loss), start from 1
//         user.currentStreak = user.currentStreak ? user.currentStreak + 1 : 1;

//         // Update beststreak if the current streak is the best
//         if (user.currentStreak > user.beststreak) {
//           user.beststreak = user.currentStreak;
//         }

//         // Update best time if the current time is better, or if this is the first time
//         if (user.besttime == null || timeTaken > user.besttime) {
//           user.besttime = timeTaken; // Set the best time to the lower (better) time
//         }
//       } else {
//         // If the user lost, reset the streak to 0
//         user.currentStreak = 0;
//       }

//       // Save updated user stats
//       user
//         .save()
//         .then(() => res.json({ message: "Stats updated successfully", user }))
//         .catch((err) =>
//           res.status(500).json({ message: "Error updating stats", error: err })
//         );
//     })
//     .catch((err) =>
//       res.status(500).json({ message: "Error finding user", error: err })
//     );
// });



// app.get("/user/profile/:email", (req, res) => {
//   const { email } = req.params;
//   UserModel.findOne({ email })
//     .then((user) => {
//       if (user) {
//         res.json(user);
//       } else {
//         res.status(404).json({ message: "User not found" });
//       }
//     })
//     .catch((err) =>
//       res.status(500).json({ message: "Error fetching user data", error: err })
//     );
// });

// app.get('/leaderboard', (req, res) => {
//     UserModel.find({})
//         .sort({ gamesWon: -1 }) // Sort by games won in descending order
//         .limit(5) // Limit to top 5 players
//         .then(users => res.json(users))
//         .catch(err => res.status(500).json({ message: "Error fetching leaderboard data", error: err }));
// });


// app.listen(3001, () => {
//   console.log("Server running!");
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// const UserModel = require("./models/User");
// const LevelModel = require("./models/Level");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3001;
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// // Middleware to verify JWT
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(403).json({ message: "No token provided" });

//   jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
//     if (err) return res.status(401).json({ message: "Unauthorized" });
//     req.user = decoded;
//     next();
//   });
// };

// // Login Route
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await UserModel.findOne({ email });

//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) return res.status(400).json({ message: "Incorrect password" });

//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET_KEY, { expiresIn: "1h" });
//     res.status(200).json({ message: "Success", token, user });
//   } catch (error) {
//     res.status(500).json({ message: "Login error", error });
//   }
// });

// // Register Route
// app.post("/register", async (req, res) => {
//   try {
//     const { email, password, name } = req.body;

//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "Email is already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new UserModel({ email, password: hashedPassword, name });
//     await newUser.save();

//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Registration error", error });
//   }
// });

// // Fetch Levels
// app.get("/levels", (req, res) => {
//   LevelModel.find({})
//     .then((levels) => res.json(levels))
//     .catch((err) => res.status(500).json({ message: "Error fetching levels" }));
// });

// // Update User Stats
// app.put("/updateStats", async (req, res) => {
//   const { email, isWin, timeTaken } = req.body;

//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.gameplayed += 1;

//     if (isWin) {
//       user.gamesWon += 1;
//       user.currentStreak = user.currentStreak ? user.currentStreak + 1 : 1;
//       if (user.currentStreak > user.beststreak) user.beststreak = user.currentStreak;
//       if (user.besttime == null || timeTaken > user.besttime) user.besttime = timeTaken;
//     } else {
//       user.currentStreak = 0;
//     }

//     await user.save();
//     res.json({ message: "Stats updated successfully", user });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating stats", error: err });
//   }
// });

// // Get User Profile
// app.get("/user/profile/:email", async (req, res) => {
//   try {
//     const user = await UserModel.findOne({ email: req.params.email });
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching user data", error: err });
//   }
// });

// // Get Leaderboard
// app.get("/leaderboard", async (req, res) => {
//   try {
//     const users = await UserModel.find().sort({ gamesWon: -1 }).limit(5);
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching leaderboard", error: err });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


// Route Imports
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const levelRoutes = require("./routes/level");

// Route Middleware
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/levels", levelRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
