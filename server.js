const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Use JSON parser and allow CORS
app.use(express.json());
app.use(cors());

// File to store user scores
const usersFile = path.join(__dirname, 'users.json');

// Helper: Read users.json
function readUsers() {
  if (!fs.existsSync(usersFile)) return {};
  const data = fs.readFileSync(usersFile, 'utf8');
  try { return JSON.parse(data); } catch { return {}; }
}

// Helper: Write users.json
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Submit score
app.post('/submit-score', (req, res) => {
  const { username, score, highScore, currentRankIndex } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });

  const users = readUsers();
  users[username] = {
    score: score || 0,
    highScore: highScore || 0,
    currentRankIndex: currentRankIndex || 0
  };
  writeUsers(users);
  res.json({ success: true });
});

// Get leaderboard
app.get('/leaderboard', (req, res) => {
  const users = readUsers();
  // Convert to array and sort by highScore descending
  const list = Object.entries(users)
    .map(([user, stats]) => ({
      user,
      highScore: Number(stats.highScore) || 0,
      currentRankIndex: Number(stats.currentRankIndex) || 0
    }))
    .sort((a, b) => b.highScore - a.highScore);

  res.json(list);
});

// Serve static files (like index.html)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
