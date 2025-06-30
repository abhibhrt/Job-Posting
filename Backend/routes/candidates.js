const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// Apply to a job
router.post('/apply/:jobId', async (req, res) => {
  try {
    const candidate = new Candidate({ ...req.body, jobId: req.params.jobId });
    await candidate.save();
    res.status(201).json({ message: 'Application submitted', candidate });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Get candidates for a specific job
router.get('/applications/:jobId', async (req, res) => {
  try {
    const candidates = await Candidate.find({ jobId: req.params.jobId });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// Get all candidates
router.get('/applications', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all applications' });
  }
});

// Delete candidate application by ID
router.delete('/applications/:id', async (req, res) => {
  try {
    const deleted = await Candidate.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

module.exports = router;
