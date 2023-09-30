const Job = require('../models/jobModel');
const mongoose = require('mongoose');

// Get all Jobs
const getJobs = async (req, res) => {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
};

// POST a new job
const createJob = async (req, res) => {
    const {
        jobTitle,
        companyName,
        jobPostingURL,
        salary,
        location,
        notes,
        status,
    } = req.body;
    try {
        const job = await Job.create({
            jobTitle,
            companyName,
            jobPostingURL,
            salary,
            location,
            notes,
            status,
        });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE an existing job
const deleteJob = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Job not found' });
    }
    const job = await Job.findOneAndDelete({ _id: id });

    if (!job) {
        return res.status(400).json({ error: 'Job not found' });
    }

    res.status(200).json(job);
};

// UPDATE an existing job
const updateJob = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Job not found' });
    }
    const job = await Job.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );
    if (!job) {
        return res.status(400).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
};

// Export all the functions to be used in the routes.js file
module.exports = {
    createJob,
    getJobs,
    deleteJob,
    updateJob,
};
