const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// PostgreSQL connection configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'kenya_legal_agent',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err.message);
  } else {
    console.log('Connected to PostgreSQL database');
    release();
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
