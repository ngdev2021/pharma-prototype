// fdaData.js
const express = require('express');
const router = express.Router();
const FdaData = require('../models/FdaData');
const auth = require('../middleware/auth');
const DrugShortage = require('../models/DrugShortage.js');

// FDA Data routes

// GET all drug shortages
router.get('/shortages', async (req, res) => {
  try {
    const shortages = await DrugShortage.find({});
    res.json(shortages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new drug shortage
router.post('/shortages', async (req, res) => {
  try {
    const newShortage = new DrugShortage(req.body);
    await newShortage.save();
    res.status(201).json(newShortage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a drug shortage by ID
router.get('/shortages/:id', async (req, res) => {
  try {
    const shortage = await DrugShortage.findById(req.params.id);
    if (!shortage) {
      return res
        .status(404)
        .json({ message: 'Drug shortage not found' });
    }
    res.json(shortage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a drug shortage
router.put('/shortages/:id', async (req, res) => {
  try {
    const updatedShortage = await DrugShortage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedShortage) {
      return res
        .status(404)
        .json({ message: 'Drug shortage not found' });
    }
    res.json(updatedShortage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a drug shortage
router.delete('/shortages/:id', async (req, res) => {
  try {
    const deletedShortage = await DrugShortage.findByIdAndDelete(
      req.params.id
    );
    if (!deletedShortage) {
      return res
        .status(404)
        .json({ message: 'Drug shortage not found' });
    }
    res.json(deletedShortage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all FDA data
router.get('/', auth, async (req, res) => {
  try {
    const fdaData = await FdaData.find({});
    res.json(fdaData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new FDA data
router.post('/', async (req, res) => {
  try {
    const fdaData = new FdaData(req.body);
    await fdaData.save();
    res.status(201).send(fdaData);
  } catch (e) {
    res.status(400).send(e);
  }
});
// GET all FDA data
router.get('/', auth, async (req, res) => {
  try {
    const fdaData = await FdaData.find({});
    res.send(fdaData);
  } catch (e) {
    res.status(500).send(e);
  }
});

// GET a FDA data by ID

// shortage data feedback
router.post('/shortages/:id/feedback', auth, async (req, res) => {
  try {
    const drugShortage = await DrugShortage.findById(req.params.id);
    if (!drugShortage) {
      return res
        .status(404)
        .json({ message: 'Drug shortage not found' });
    }

    if (!drugShortage.feedback) {
      drugShortage.feedback = []; // Initialize the array if it's undefined
    }

    const feedback = {
      user: req.user.id,
      comment: req.body.comment,
      date: req.body.date || new Date(),
    };

    drugShortage.feedback.push(feedback);
    await drugShortage.save();

    res.status(201).json(drugShortage.feedback);
  } catch (err) {
    console.error('Error while submitting feedback:', err);
    res.status(500).json({ message: err.message });
  }
});

// get shortage data feedback
router.get('/shortages/:id/feedback', async (req, res) => {
  try {
    const drugShortage = await DrugShortage.findById(req.params.id);
    if (!drugShortage) {
      return res
        .status(404)
        .json({ message: 'Drug shortage not found' });
    }

    res.json(drugShortage.feedback);
  } catch (err) {
    console.error('Error while getting feedback:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
