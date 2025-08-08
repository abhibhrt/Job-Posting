const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  images: {
    url: String,
    publicId: String
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Update', updateSchema); 