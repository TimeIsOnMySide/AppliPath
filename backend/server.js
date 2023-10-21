// This is the express server.
// Build out this API so that my database (MongoDB) and my front end (React) can talk to each other

const express = require('express'); // require express package that I installed with 'npm install express'
const mongoose = require('mongoose');
require('dotenv').config(); // Environment variables
const cors = require('cors');
const fetch = require('node-fetch'); // Import node-fetch
const app = express(); // Creates an express app and store it in 'app'
const routes = require('./routes');

// Middleware
app.use(express.json());

// CORS
app.use(cors());

// Routes
app.use('/api', routes);

// Connect to mongoDB atlas
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log(
                'connected to MongoDB Atlas & listening on port ',
                process.env.PORT
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });

// Create a route to handle address geocoding
app.get('/geocode', async (req, res) => {
    const address = req.query.address;

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        const location = data.results[0].geometry.location;
        res.json(location);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to geocode address' });
    }
});
