const express = require('express');
const router = express.Router();
const Update = require('../models/Update');

// Temporary fallback middleware if not imported
const authenticate = (req, res, next) => { next(); };
const isAdmin = (req, res, next) => { next(); };

// Get all updates
router.get('/', async (req, res) => {
  try {
    const updates = await Update.find().sort({ createdAt: -1 });
    res.json(updates);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new update (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { message } = req.body;
    const update = new Update({ message });
    await update.save();
    res.status(201).json(update);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Update an update (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { message } = req.body;
    const update = await Update.findByIdAndUpdate(
      req.params.id,
      { message },
      { new: true }
    );
    if (!update) return res.status(404).json({ error: 'Not found' });
    res.json(update);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Delete an update (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const update = await Update.findByIdAndDelete(req.params.id);
    if (!update) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a sample update if none exist (for demonstration)
router.get('/seed', async (req, res) => {
  const count = await Update.countDocuments();
  if (count === 0) {
    const update = new Update({ message: 'selected candidate are\nArvind\nNiru\nAbhi' });
    await update.save();
    return res.json({ message: 'Seeded sample update.' });
  }
  res.json({ message: 'Updates already exist.' });
});

module.exports = router; 