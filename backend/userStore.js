// userStore.js
const bcrypt = require('bcrypt');
const db = require('./db');
const { generateAccessToken, generateRefreshToken } = require('./jwtUtils');

// Function to register a new user
const registerUser = async (username, password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    
    return new Promise((resolve, reject) => {
        db.execute(query, [username, hashedPassword], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    reject(new Error('User already exists'));
                } else {
                    reject(err);
                }
            } else {
                resolve(results);
            }
        });
    });
};

const loginUser = async (username, password, res) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    try {
        const [results] = await db.query(query, [username])

        if (results.length === 0) return null; // User not found

        const user = results[0];
        if (bcrypt.compareSync(password, user.User_Password)) {
            return generateAccessToken({ username }, res); // Generate and return a JWT
        }
        
        return null; // Login failed
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Authentication failed'); // Throw error to handle it in the caller
    }
};

const refreshUserLogin = async (username, password, res) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    try {
        const [results] = await db.query(query, [username])

        if (results.length === 0) return null; // User not found

        const user = results[0];
        if (bcrypt.compareSync(password, user.User_Password)) {
            return generateRefreshToken({ username }, res); // Generate and return a JWT
        }
        
        return null; // Login failed
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Authentication failed'); // Throw error to handle it in the caller
    }
}

// Export functions
module.exports = {
    registerUser,
    loginUser,
    refreshUserLogin,
};
