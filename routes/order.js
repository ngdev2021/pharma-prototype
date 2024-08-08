const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/order');

// Get all orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
