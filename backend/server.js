// This is the express server.
// Build out this API so that my database (MongoDB) and my front end (React) can talk to each other

const express = require('express'); // require express package that I installed with 'npm install express'
const mongoose = require('mongoose');
require('dotenv').config(); // Environment variables
const cors = require('cors');
const axios = require('axios'); // Import 'axios'
const app = express(); // Creates an express app and store it in 'app'
const jobRoutes = require('./routes/jobs');
const userRoutes = require('./routes/user');

// Middleware
app.use(express.json());

// CORS
app.use(cors());

// Routes
app.use('/api', jobRoutes);
app.use('/api/user', userRoutes);

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
