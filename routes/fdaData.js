// fdaData.js
const express = require('express');
const router = express.Router();
const FdaData = require('../models/FdaData');
const auth = require('../middleware/auth');

// FDA Data routes
router.post('/', async (req, res) => {
  try {
    const fdaData = new FdaData(req.body);
    await fdaData.save();
    res.status(201).send(fdaData);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const fdaData = await FdaData.find({});
    res.send(fdaData);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
