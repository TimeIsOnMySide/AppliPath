// These are all the routes for my node server. I put them in a seperate files to keep the server.js file clean

const express = require('express');
const Job = require('./models/jobModel');

const router = express.Router();

// GET all job cards
router.get('/jobs', (req, res) => {
    res.json({ mssg: 'GET all job cards' });
});

// POST a new job card
router.post('/jobs', async (req, res) => {
    const { jobTitle, companyName, jobPostingURL, salary, location, notes } =
        req.body;
    try {
        const job = await Job.create({
            jobTitle,
            companyName,
            jobPostingURL,
            salary,
            location,
            notes,
        });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a job card
router.delete('/jobs/:id', (req, res) => {
    res.json({ mssg: 'DELETE a job card' });
});

// UPDATE a job card
router.patch('/jobs/:id', (req, res) => {
    res.json({ mssg: 'UPDATE a job card' });
});

module.exports = router;
