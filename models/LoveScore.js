// models/LoveScore.js
const mongoose = require('mongoose');

const loveScoreSchema = new mongoose.Schema({
  name1: { type: String, required: true },
  name2: { type: String, required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model('LoveScore', loveScoreSchema);