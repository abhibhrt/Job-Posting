const express = require('express');
const router = express.Router();
const Update = require('../models/Update');
const handleImage = require('../utils/cloudinaryUtil');

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
router.post('/', async (req, res) => {
  try {
    let imre = {
      url: "https://res.cloudinary.com/dzrvn0sdm/image/upload/v1754682063/Gemini_Generated_Image_d9hd3md9hd3md9hd_nxq8ix.png",
      publicId: null
    };

    if (req.body.images) {
      imre = await handleImage('add', { imagePath: req.body.images });
    }

    const { message } = req.body;
    const update = new Update({
      message,
      images: {
        url: imre.url,
        publicId: imre.publicId
      }
    });

    await update.save();
    res.status(201).json(update);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Update an update (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { message, images } = req.body;
    let updateData = { message };

    const existingUpdate = await Update.findById(req.params.id);
    if (!existingUpdate) return res.status(404).json({ error: 'Not found' });

    // If new image provided
    if (images) {
      // Delete old image if it has a publicId
      if (existingUpdate.images?.publicId) {
        await handleImage('delete', { publicId: existingUpdate.images.publicId });
      }

      // Upload new image
      const newImage = await handleImage('add', { imagePath: images });
      updateData.images = {
        url: newImage.url,
        publicId: newImage.publicId
      };
    }

    const updated = await Update.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Delete an update (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const up = await Update.findById(req.params.id);
    if (!up) return res.status(404).json({ error: 'Not found' });

    if (up.images?.publicId) {
      await handleImage('delete', { publicId: up.images.publicId });
    }

    await Update.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
