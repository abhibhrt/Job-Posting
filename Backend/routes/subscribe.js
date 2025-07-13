const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscribe.js');

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    await Subscriber.findOneAndUpdate(
      { email },
      { email },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: 'Email saved successfully' });
  } catch (err) {
    console.error('Error in subscription:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
    try{
        const emails = await Subscriber.find({});
        res.json(emails);
    }catch(err){
        console.log("error occurred: " + err);
    }
})

module.exports = router;
