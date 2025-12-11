// ------------------------
// server.js (or index.js)
// ------------------------

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// ------------------------
// MongoDB Connection
// ------------------------
const uri = process.env.MONGO_URI || 
  'mongodb+srv://tresforwrlddbuser:Krsten12@cluster0.jxit1qh.mongodb.net/game101?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ------------------------
// Mongoose Schema & Model
// ------------------------
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
  highScore: { type: Number, default: 0 },
  currentRankIndex: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

// ------------------------
// Routes
// ------------------------

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    const data = {};
    users.forEach(u => {
      data[u.username] = {
        score: u.score,
        highScore: u.highScore,
        currentRankIndex: u.currentRankIndex
      };
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get a single user
app.get('/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      score: user.score,
      highScore: user.highScore,
      currentRankIndex: user.currentRankIndex
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create or update user
app.post('/user/:username', async (req, res) => {
  try {
    const { score, highScore, currentRankIndex } = req.body;
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { score, highScore, currentRankIndex },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({ message: 'User saved successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

// ------------------------
// Start server
// ------------------------
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${listener.address().port}`);
});