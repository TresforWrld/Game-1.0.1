const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Render MUST use process.env.PORT
const PORT = process.env.PORT || 3000;

// Serve public folder
app.use(express.static(path.join(__dirname, "public")));

// USERS FILE
const usersPath = path.join(__dirname, "users.json");

// Ensure users.json exists
if (!fs.existsSync(usersPath)) {
  fs.writeFileSync(usersPath, JSON.stringify({}, null, 2));
}

// GET leaderboard
app.get("/leaderboard", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(usersPath, "utf8"));
    res.json(data);
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ error: "Cannot read users" });
  }
});

// SAVE / UPDATE user
app.post("/save", (req, res) => {
  try {
    const { username, highScore, currentRankIndex } = req.body;
    if (!username) return res.status(400).json({ error: "Missing username" });

    let users = JSON.parse(fs.readFileSync(usersPath, "utf8"));

    users[username] = {
      highScore: Number(highScore) || 0,
      currentRankIndex: Number(currentRankIndex) || 0
    };

    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: "Save failed" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});