// models/Candidate.js
const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  resumeLink: { type: String, required: true },
  adharLink: {type:String},
  currentLocation: String,
  availableForJoining: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Candidate", candidateSchema);
