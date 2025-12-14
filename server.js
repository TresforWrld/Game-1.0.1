const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const USERS_FILE = path.join(__dirname, "users.json");

/* Load users from file */
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return {};
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

/* Save users to file */
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

/* Leaderboard */
app.get("/leaderboard", (req, res) => {
  const users = loadUsers();
  res.json(users);
});

/* Update score (PERMANENT) */
app.post("/update-score", (req, res) => {
  const { username, score, rankIndex } = req.body;
  if (!username) return res.status(400).json({ error: "Missing username" });

  const users = loadUsers();

  if (!users[username]) {
    users[username] = {
      highScore: 0,
      currentRankIndex: 0
    };
  }

  // keep highest score only
  users[username].highScore = Math.max(
    users[username].highScore,
    Number(score) || 0
  );

  users[username].currentRankIndex = Number(rankIndex) || 0;

  // 🔥 THIS IS WHAT YOU WERE MISSING
  saveUsers(users);

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});