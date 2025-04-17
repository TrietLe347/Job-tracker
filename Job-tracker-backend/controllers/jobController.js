const Job = require('../models/Job');
const axios = require('axios');

exports.searchJobs = async (req, res) => {
    try {
        const { query, location } = req.query;
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: { query, location, page: '1' },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Job Search Failed' });
    }
};

exports.getSavedJobs = async (req, res) => {
    const job = await Job.find({ userId: req.userId });
    res.json(jobs);
};

exports.updateJob = async (req, res) => {
    const job = await Job.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        req.body,
        { new: true }
    );
    res.json(job);
};

exports.deleteJob = async (req, res) => {
    await Job.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ success: true });
};

exports.saveJob = async (req, res) => {
    try {
        const job = new Job({
            ...req.body,
            userId: req.userId, // attached by your auth middleware
        });

        await job.save();
        res.json(job);
    } catch (err) {
        console.error('[SAVE JOB ERROR]', err);
        res.status(500).json({ error: 'Failed to save job' });
    }
};