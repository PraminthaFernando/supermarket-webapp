// jwtUtils.js
const jwt = require('jsonwebtoken');
const {Token} =  require("./SQLiteDB")
require('dotenv').config();

const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION; // Access token expiration time
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;
const JWT_SECRET = process.env.JWT_SECRET
const REFRESH_TOKENS_DB = {};

// Function to generate a JWT
const generateAccessToken = (user, res) => {
    const accessToken = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    res.cookie('accessToken', accessToken, {
        httpOnly: true, // Prevents JavaScript access
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict', // CSRF protection
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Set expiration
    });
    return { accessToken };
};

const generateRefreshToken = async (user,res) => {
    const refreshToken = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
    REFRESH_TOKENS_DB[refreshToken] = user.username;
    await Token.create({
        username: user.username,
        refreshToken: refreshToken,
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Set expiration time
    }); 
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, // Prevents JavaScript access
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict', // CSRF protection
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Set expiration
    });
    // return refreshToken;
    return { refreshToken };
};

// Function to verify a JWT
const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

const verifyRefreshToken = async (token, res) => {
    const storedToken = await Token.findOne({ where: { refreshToken: token } });
    if (!storedToken || new Date() > storedToken.expiresAt) {
        return null; // Invalid or expired token
    }

    try {
        return verifyToken(token); // Verify and return decoded token if valid
    } catch (error) {
        const result = await Token.destroy({
            where: {
                refreshToken: token
            }
        });
    
        if (result > 0) {
            console.log('Token deleted successfully');
        } else {
            console.log('Token not found');
        }
        res.cookie('refreshToken', '', { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict', 
            expires: new Date(0)
        });
        return null; // Return null if token verification fails
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken,
};