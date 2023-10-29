// These are all the job routes for my node server. I put them in a seperate files to keep the server.js file clean

const express = require('express');
const {
    createJob,
    getJobs,
    deleteJob,
    updateJob,
} = require('../controllers/jobController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth); // Protect all job routes

// GET all job cards
router.get('/jobs', getJobs);

// POST a new job card
router.post('/jobs', createJob);

// DELETE a job card
router.delete('/jobs/:id', deleteJob);

// UPDATE a job card
router.patch('/jobs/:id', updateJob);

module.exports = router;
