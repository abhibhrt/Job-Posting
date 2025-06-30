const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Update', updateSchema); 