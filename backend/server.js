const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const FILE = 'tasks.json';

app.get('/tasks', (req, res) => {
  fs.readFile(FILE, 'utf8', (err, data) => {
    if (err) return res.json([]);
    res.json(JSON.parse(data || '[]'));
  });
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  fs.readFile(FILE, 'utf8', (err, data) => {
    const tasks = err ? [] : JSON.parse(data || '[]');
    tasks.push(newTask);
    fs.writeFile(FILE, JSON.stringify(tasks), () => {
      res.json({ message: 'Task saved!' });
    });
  });
});
app.listen(PORT, () => {
  console.log("✅ Server running at http://localhost:"+PORT);
});