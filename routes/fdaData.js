const express = require('express');
const router = express.Router();
const FdaData = require('../models/FdaData');

// Create new FDA data entry
router.post('/', async (req, res) => {
  try {
    const newFdaData = new FdaData(req.body);
    await newFdaData.save();
    res.status(201).json(newFdaData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all FDA data entries
router.get('/', async (req, res) => {
  try {
    const fdaData = await FdaData.find();
    res.json(fdaData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
