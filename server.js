const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const USERS_FILE = path.join(__dirname, "users.json");

// Ensure users.json exists
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "{}");

// GET leaderboard (all users)
app.get("/leaderboard", (req, res) => {
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf8") || "{}";
    const users = JSON.parse(raw);
    res.json(users);
  } catch (err) {
    console.error("Error reading leaderboard:", err);
    res.status(500).json({ error: "Failed to load leaderboard" });
  }
});

// POST update score
app.post("/update-score", (req, res) => {
  const { username, score, rankIndex } = req.body;
  if (!username) return res.status(400).json({ error: "Missing username" });

  try {
    const raw = fs.readFileSync(USERS_FILE, "utf8") || "{}";
    const users = JSON.parse(raw);

    if (!users[username]) {
      users[username] = { highScore: 0, currentRankIndex: 0 };
    }

    // Update only if new score is higher
    if (score > users[username].highScore) {
      users[username].highScore = score;
      users[username].currentRankIndex = rankIndex ?? users[username].currentRankIndex;
    }

    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.json({ success: true, user: users[username] });
  } catch (err) {
    console.error("Error updating score:", err);
    res.status(500).json({ error: "Failed to update score" });
  }
});

// START server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));