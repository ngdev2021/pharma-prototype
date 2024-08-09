const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Buyer = require('../models/Buyer');

// Create a new buyer
router.post('/', async (req, res) => {
  try {
    const newBuyer = new Buyer(req.body);
    await newBuyer.save();
    res.status(201).json(newBuyer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all buyers
router.get('/', auth, async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
