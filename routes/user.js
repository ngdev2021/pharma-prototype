const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Order = require('../models/order');
const Review = require('../models/review');
const auth = require('../middleware/auth');

// Get all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Assuming password verification logic here
    // ...

    const token = jwt.sign(
      { user: { id: user.id, name: user.name } },
      'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Get a user by ID, including orders and reviews
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orders = await Order.find({ userId: user._id }).select(
      '-someHeavyField'
    );
    const reviews = await Review.find({ userId: user._id }).select(
      '-someHeavyField'
    );

    res.json({
      user,
      orders,
      reviews,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve user details' });
  }
});

// Get user orders
router.get('/:id/orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.json(orders);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Get user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Update user
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
