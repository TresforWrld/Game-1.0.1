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
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, "[]"); // store as array
}

// ----------------------
// GET LEADERBOARD (always returns array)
// ----------------------
app.get("/leaderboard", (req, res) => {
  try {
    let raw = fs.readFileSync(USERS_FILE, "utf8") || "[]";
    let users = JSON.parse(raw);

    // If old object format, convert it
    if (!Array.isArray(users)) {
      users = Object.keys(users).map(username => ({
        username,
        score: users[username].highScore || 0
      }));
    }

    // Sort by score DESC
    users.sort((a, b) => b.score - a.score);

    res.json(users);
  } catch (err) {
    console.error("Error reading leaderboard:", err);
    res.status(500).json({ error: "Failed to load leaderboard" });
  }
});

// ----------------------
// UPDATE SCORE (add or update user)
// ----------------------
app.post("/update-score", (req, res) => {
  const { username, score } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  try {
    let raw = fs.readFileSync(USERS_FILE, "utf8") || "[]";
    let users = JSON.parse(raw);

    // Convert old object format
    if (!Array.isArray(users)) {
      users = Object.keys(users).map(username => ({
        username,
        score: users[username].highScore || 0
      }));
    }

    // Try to find existing user
    let user = users.find(u => u.username === username);

    if (user) {
      // Update only if the score is higher
      if (score > user.score) user.score = score;
    } else {
      // Create new user
      users.push({ username, score });
    }

    // Save back to users.json
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    res.json({ success: true });
  } catch (err) {
    console.error("Error updating score:", err);
    res.status(500).json({ error: "Failed to update score" });
  }
});

// ----------------------
// START SERVER
// ----------------------
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));