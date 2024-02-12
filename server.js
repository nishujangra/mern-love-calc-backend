require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const LoveScore = require('./models/LoveScore');

const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const url = `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@cluster0.bwi1a0u.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(`${url}`);

const calculateLoveScore = (name1, name2) => {
  const sum1 = name1.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const sum2 = name2.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const totalSum = sum1 + sum2;
  const score = totalSum % 101; // Remainder when divided by 101
  return score;
};

// Define routes
app.post('/calculate-love', (req, res) => {
  const { name1, name2 } = req.body;
  // Calculate love score (dummy calculation for example)
  const score = calculateLoveScore(name1, name2); 

  // Save to MongoDB
  const newLoveScore = new LoveScore({ name1, name2, score });
  newLoveScore.save().then(() => {
    res.json({ score });
  })
  .catch((err) => {
    console.log(err);
  });
  // res.json({ score });
});

app.listen(port, () => {
  console.log(`Server is hosted at http://localhost:${port}`);
});
