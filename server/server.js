const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const cors = require('cors');
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS for all routes

// Setup PostgreSQL connection
const pool = new Pool({
  user: 'postgres',            // Replace with your PostgreSQL username
  host: 'localhost',           // Replace with your host
  database: 'postgres',        // Replace with your database name
  password: 'winner',          // Replace with your PostgreSQL password
  port: 5432,                  // Default port for PostgreSQL
});

// Test the database connection
pool
  .connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error', err.stack);
  });

// Sign-up endpoint
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    // Validate name, email, and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into the database (including name)
      const result = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword]
      );
  
      res.status(201).json({
        message: 'User created successfully',
        user: result.rows[0],
      });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'An error occurred while creating the account' });
    }
  });
  
  

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query to get the user from the database by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Compare the hashed password with the entered password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful!' });

  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
});

// Server listening
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
