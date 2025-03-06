const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static('public'));

// Create a new SQLite database (or open it if it already exists)
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    return console.error('Error opening database:', err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    phoneNumber TEXT
  );
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  }
});

// HTTP POST endpoint to add a user record
app.post('/add-user', (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;

  if (!firstName || !lastName || !phoneNumber) {
    return res.status(400).json({ error: 'First name, last name, and phone number are required' });
  }

  const insertSQL = `INSERT INTO users (firstName, lastName, phoneNumber) VALUES (?, ?, ?)`;

  db.run(insertSQL, [firstName, lastName, phoneNumber], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, firstName, lastName, phoneNumber });
  });
});

// HTTP GET endpoint to retrieve all users
app.get('/users', (req, res) => {
  const selectSQL = `SELECT * FROM users`;

  db.all(selectSQL, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

// HTTP PUT endpoint to update a user's information by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phoneNumber } = req.body;

  if (!firstName || !lastName || !phoneNumber) {
    return res.status(400).json({ error: 'First name, last name, and phone number are required' });
  }

  const updateSQL = `UPDATE users SET firstName = ?, lastName = ?, phoneNumber = ? WHERE id = ?`;

  db.run(updateSQL, [firstName, lastName, phoneNumber, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ id, firstName, lastName, phoneNumber });
  });
});

// HTTP DELETE endpoint to delete a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const deleteSQL = `DELETE FROM users WHERE id = ?`;

  db.run(deleteSQL, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: `User with ID ${id} deleted` });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Gracefully close the database on app termination
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      return console.error('Error closing database:', err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});
