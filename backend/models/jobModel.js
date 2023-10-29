// This is the schema for the information in a job card that will be stored in the database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the structure of the jobCard information as its stored in the database
const jobSchema = new Schema(
    {
        jobTitle: { type: String, required: true },
        companyName: { type: String, required: true },
        jobPostingURL: { type: String, required: true },
        salary: Number,
        location: String,
        notes: String,
        status: { type: String, default: 'Need to Apply' },
        user_id: {
            type: String,
            required: true,
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model('Job', jobSchema);
