const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const app = express();
const routes = require('./routes');

// PassportJS authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// Use session to store user data
app.use(
    session({
        secret: 'your-secret-key',
        resave: true,
        saveUninitialized: true,
    })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Define a User model and configure Passport to use it
const User = require('./models/userModel');

passport.use(
    'local-register',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) => {
            try {
                // Check if the user already exists
                const existingUser = await User.findOne({ username: username });

                if (existingUser) {
                    // Username is already taken
                    return done(null, false, {
                        message: 'Username is already in use',
                    });
                }

                // Create a new user
                const newUser = new User({ username, password });

                // Save the user to the database
                await newUser.save();

                // Registration successful
                return done(null, newUser);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    'local-login',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        (username, password, done) => {
            User.authenticate()(username, password, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username or password',
                    });
                }
                return done(null, user);
            });
        }
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware
app.use(express.json());

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Authentication required' });
};

// CORS
app.use(cors());

// Now define your routes

// Routes
app.use('/api/jobs', ensureAuthenticated, routes);
app.use('/api', routes);

// Connect to MongoDB Atlas
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log(
                'Connected to MongoDB Atlas & listening on port ',
                process.env.PORT
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });

app.get('/geocode', async (req, res) => {
    const address = req.query.address;
    console.log(address);
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            res.json(location);
        } else {
            console.error(
                'Geocode request failed with status:',
                response.data.status
            );
            res.status(500).json({ error: 'Failed to geocode address' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to geocode address' });
    }
});
