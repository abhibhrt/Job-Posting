const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const Review = require('../models/Review');

// Rate limiter: 1 request per 24 hours per IP
const reviewLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 1, // limit each IP to 1 review per 24 hours
  message: { message: "You've Already Submitted One" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', reviewLimiter, async (req, res) => {
  try {
    const reviews = new Review(req.body);
    await reviews.save();
    res.status(201).json({ message: 'Review submitted', reviews });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit review', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review', error });
  }
});

module.exports = router;
