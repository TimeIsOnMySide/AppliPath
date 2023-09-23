// This is the express server.
// Build out this API so that my database (MongoDB) and my front end (React) can talk to each other

const express = require('express'); // require express package that I installed with 'npm install express'
const mongoose = require('mongoose');
require('dotenv').config(); // Environment variables

const app = express(); // Creates an express app and store it in 'app'
const routes = require('./routes');

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

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
