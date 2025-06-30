const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });

  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful' });
});

// Change password
router.post('/change-password', async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const admin = await Admin.findOne({ username, password: oldPassword });

  if (!admin) {
    return res.status(401).json({ message: 'Old password incorrect' });
  }

  admin.password = newPassword;
  await admin.save();
  res.status(200).json({ message: 'Password updated successfully' });
});

module.exports = router;
