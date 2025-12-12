# 🎮 Quick Quiz Game – ANICADE’s ELEVATE / SkillRise Africa 🌍

---

## ⚡ Overview

Welcome to **Quick Quiz Game**, a modern web-based quiz crafted by Tresfor Wrld under ANICADE's ELEVATE program.  
Test your knowledge, level up through ranks, and compete on a real-time leaderboard!

---

## ✨ Features

- Randomized question generator (Math, GK, Science, and more)  
- Multiple-choice & text-based answers  
- Dynamic scoring system with high score tracking  
- Interactive rank progression system  
- Real-time leaderboard updates  
- Smooth scrolling credits & updates ticker  
- Fully responsive design for desktop & mobile  

---

## 🛠️ Technologies

- HTML5, CSS3, JavaScript (ES6+)  
- LocalStorage for persistent scores & rank  
- Fetch API for leaderboard & server updates  
- Optional JSON-based question storage for easy content management  

---

## 🎯 How It Works

```mermaid

1. Login or pick a username.


2. Select a subject from the dropdown.


3. Answer questions — text or multiple-choice.


4. Score points for correct answers.


5. Rank up as you progress!


6. High score and rank saved automatically.


7. Compete on the live leaderboard.




---

🖥️ Installation / Deployment

git clone https://github.com/YourUsername/QuickQuizGame.git
cd QuickQuizGame

1. Open index.html ```mermaid
flowchart LR
A[Login or choose username] --> B[Select Subject]
B --> C[Answer Questions]
C --> D{Correct?}
D -- Yes --> E[Score Increases]
D -- No --> F[Try Again]
E --> G[Rank Up]
G --> H[Leaderboard Update]in your browser.


2. Make sure questions.json & ranks.json are in the public/ folder.


3. Optional: Serve via a local server for Fetch API support:



npx serve


---

📚 File Structure

/public
  ├─ index.html
  ├─ main.js
  ├─ shuffle.js
  ├─ gk.json
  ├─ questions.json/
      ├─ math.json
      ├─ biology.json
      └─ ...
  ├─ ranks.json
  └─ users.json


---

🌐 Features to Showcase

💫 Animated leaderboard updates

💫 Smooth scrolling credits ticker

💫 Multiple-choice answers shuffled per question

💫 Fully responsive mobile-friendly layout



---

✨ Future Enhancements

Shuffle all subjects, not just math

Add admin panel to manage questions

Add user profile system with avatars

Include daily challenges & streaks

Integrate real-time multiplayer quiz mode



---

📝 Credits

Developed by Tresfor Wrld

Part of ANICADE’s ELEVATE Program

Supported by SkillRise Africa 🌍



---

📬 Contact / Support

Report a bug: issues

Email: animewrldwarsanicade@gmail.com

Website: ⏳

