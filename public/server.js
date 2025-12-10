const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const USERS_FILE = path.join(__dirname, 'users.json');

app.get('/users', (req,res)=>{
  const data = JSON.parse(fs.readFileSync(USERS_FILE));
  res.json(data);
});

app.get('/user/:username', (req,res)=>{
  const data = JSON.parse(fs.readFileSync(USERS_FILE));
  const user = data[req.params.username];
  if(user) res.json(user);
  else res.status(404).json({error:'User not found'});
});

app.post('/user/:username', (req,res)=>{
  const data = JSON.parse(fs.readFileSync(USERS_FILE));
  data[req.params.username] = req.body;
  fs.writeFileSync(USERS_FILE, JSON.stringify(data,null,2));
  res.json({message:'User saved successfully'});
});

const listener = app.listen(process.env.PORT || 3000, ()=>{
  console.log(`Server running on port ${listener.address().port}`);
});
