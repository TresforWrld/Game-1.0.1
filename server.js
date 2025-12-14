const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

/* ===============================
   MIDDLEWARE
================================ */
app.use(express.json());

// ✅ SERVE index.html FROM /public
app.use(express.static(path.join(__dirname, "public")));

/* ===============================
   FILE PATH
================================ */
const USERS_FILE = path.join(__dirname, "users.json");

/* ===============================
   HELPERS
================================ */
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, "{}");
    return {};
  }
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

/* ===============================
   ROUTES
================================ */

/* PERMANENT LEADERBOARD */
app.get("/leaderboard", (req, res) => {
  const users = loadUsers();
  res.json(users);
});

/* UPDATE SCORE (GLOBAL + PERMANENT) */
app.post("/update-score", (req, res) => {
  const { username, score, rankIndex } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  const users = loadUsers();

  if (!users[username]) {
    users[username] = {
      highScore: 0,
      currentRankIndex: 0
    };
  }

  // ✅ KEEP HIGHEST SCORE FOREVER
  users[username].highScore = Math.max(
    users[username].highScore,
    Number(score) || 0
  );

  users[username].currentRankIndex =
    Number(rankIndex) ?? users[username].currentRankIndex;

  // ✅ SAVE TO FILE (THIS MAKES IT PERMANENT)
  saveUsers(users);

  res.json({
    success: true,
    user: users[username]
  });
});

/* ===============================
   START SERVER
================================ */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});