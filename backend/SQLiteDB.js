const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // This will create a SQLite database file
});

// Define a model for storing refresh tokens
const Token = sequelize.define('Token', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

// db.js
sequelize.authenticate()
    .then(() => {
        console.log('SQLite Database connected');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });


// Sync the model to create the table
sequelize.sync()

module.exports = {Token, sequelize}
