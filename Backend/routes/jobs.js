const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const toSubscribers = require('../config/mailer');

// Create a job
router.post('/', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  await toSubscribers(req.body);
  res.status(201).json(job);
});

// Get all jobs
router.get('/', async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

// Get job by ID
router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
});

// Update job
router.put('/:id', async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedJob);
});

// Delete job
router.delete('/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: 'Job deleted' });
});

module.exports = router;
