// order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Order routes
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
