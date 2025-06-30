// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  logo: String,
  companyName: { type: String, required: true },
  salary: String,
  location: String,
  jobRole: {type: String, require: true},
  jobType: { type: String, required: true },
  workingHours: String,
  openings: {type:Number},
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
