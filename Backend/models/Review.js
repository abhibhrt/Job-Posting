// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  email: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
