const express = require('express');
const router = express.Router();
const FdaData = require('../models/FdaData'); // Assuming you have an FdaData model

// POST request to add FDA data
router.post('/', async (req, res) => {
  const { drugName, shortageStatus, details } = req.body;

  if (!drugName || !shortageStatus || !details) {
    return res
      .status(400)
      .json({ message: 'All fields are required' });
  }

  try {
    const newFdaData = new FdaData({
      drugName,
      shortageStatus,
      details,
    });
    await newFdaData.save();
    res.status(201).json(newFdaData);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating FDA data', error });
  }
});

module.exports = router;
