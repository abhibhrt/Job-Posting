const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Default admin credentials
const DEFAULT_ADMIN = {
  username: 'hrzone',
  password: 'Admin@123',
};

// Middleware to ensure at least one admin exists
const ensureAdminExists = async () => {
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    await Admin.create(DEFAULT_ADMIN);
    console.log('Default admin created:', DEFAULT_ADMIN.username);
  } 
};

// Admin login 
router.post('/login', async (req, res) => {
  await ensureAdminExists();

  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });

  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful' });
});

// Change password
router.post('/change-password', async (req, res) => {
  await ensureAdminExists();

  const { username, oldPassword, newPassword } = req.body;
  const admin = await Admin.findOne({ username, password: oldPassword });

  if (!admin) {
    return res.status(401).json({ message: 'Old username/password incorrect' });
  }

  admin.password = newPassword;
  await admin.save();
  res.status(200).json({ message: 'Password updated successfully' });
});

module.exports = router;
