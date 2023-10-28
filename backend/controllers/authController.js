const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/userModel');

// Register Route
const registerUser = async (req, res, next) => {
    // Create a new user using the User model
    const newUser = new User({ username: req.body.username });

    // Register the user with Passport.js
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.error('Registration error:', err);
            return res.status(500).json({ error: 'Error during registration' });
        }

        // User successfully registered, now log in the user
        req.login(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return res
                    .status(500)
                    .json({ error: 'Error during login after registration' });
            }

            console.log('Registration and login successful');
            return res
                .status(200)
                .json({ message: 'Registration and login successful' });
        });
    });
};

// Login Route
const loginUser = async (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            console.error('Passport error:', err);
            return res.status(500).json({ error: 'Error during login' });
        }
        if (!user) {
            console.error('User not found:', info);
            return res
                .status(401)
                .json({ error: 'Invalid username or password' });
        }

        // User successfully logged in
        req.login(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return res.status(500).json({ error: 'Error during login' });
            }

            console.log('Login successful');
            return res.status(200).json({ user });
        });
    })(req, res, next);
};

// Logout Route
const logoutUser = async (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logout successful' });
};

// Export all the functions to be used in the routes.js file
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};
