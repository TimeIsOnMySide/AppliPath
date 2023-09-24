// These are all the routes for my node server. I put them in a seperate files to keep the server.js file clean

const express = require('express');
const {
    createJob,
    getJobs,
    deleteJob,
    updateJob,
} = require('./controllers/jobController');

const router = express.Router();

// GET all job cards
router.get('/jobs', getJobs);

// POST a new job card
router.post('/jobs', createJob);

// DELETE a job card
router.delete('/jobs/:id', deleteJob);

// UPDATE a job card
router.patch('/jobs/:id', updateJob);

module.exports = router;