// db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function connectToDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database.');
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Error connecting to MySQL database:', err);
        process.exit(1); // Exit the process if there's an error
    }
}

// Call the connection function
connectToDatabase();

module.exports = pool;
