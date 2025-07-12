const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

const usersFile = path.join(__dirname, 'data', 'users.json');

// Utility function to read and write users
const getUsers = () => JSON.parse(fs.readFileSync(usersFile));
const saveUsers = (users) => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

// Routes

// GET all users
app.get('/users', (req, res) => {
  const users = getUsers();
  res.json(users);
});

// GET a user by ID
app.get('/users/:id', (req, res) => {
  const users = getUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) res.json(user);
  else res.status(404).json({ message: 'User not found' });
});

// POST a new user
app.post('/users', (req, res) => {
  const users = getUsers();
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  saveUsers(users);
  res.status(201).json(newUser);
});

// PUT (update) user
app.put('/users/:id', (req, res) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    saveUsers(users);
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
  let users = getUsers();
  const newUsers = users.filter(u => u.id !== parseInt(req.params.id));
  if (users.length === newUsers.length) {
    res.status(404).json({ message: 'User not found' });
  } else {
    saveUsers(newUsers);
    res.json({ message: 'User deleted' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
