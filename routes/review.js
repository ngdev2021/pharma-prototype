const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');

// Create a new review
router.post('/', auth, async (req, res) => {
  try {
    const newReview = new Review({
      ...req.body,
      userId: req.user.id, // Assuming you have user ID in req.user from auth middleware
      avatar: req.user.avatar, // Assuming you have avatar in req.user from auth middleware
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all reviews
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find().populate(
      'userId',
      'name avatar'
    ); // populate user details
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get reviews by user ID
router.get('/:id', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.id });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get a review by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a review
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a review
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(
      req.params.id
    );
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark a review as helpful
router.post('/:id/helpful', auth, async (req, res) => {
  console.log(
    `Received request to mark review ${req.params.id} as helpful by user ${req.user.id}`
  );
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      console.log('Review not found');
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.helpfulVoters.includes(req.user.id)) {
      console.log('User has already marked this review as helpful');
      return res.status(400).json({
        message: 'You have already marked this review as helpful',
      });
    }

    review.helpfulVoters.push(req.user.id);
    review.helpfulCount = review.helpfulVoters.length;
    console.log('Updated helpful voters:', review.helpfulVoters);

    await review.save();
    console.log('Review updated successfully:', review);
    res.json(review);
  } catch (error) {
    console.error('Error updating review:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Mark a review as unhelpful
router.post('/:id/unhelpful', auth, async (req, res) => {
  console.log(
    `Received request to mark review ${req.params.id} as unhelpful`
  );
  console.log(`Request made by user: ${req.user.id}`);

  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      console.log('Review not found');
      return res.status(404).json({ message: 'Review not found' });
    }

    console.log('Review found:', review);

    if (review.unhelpfulVoters.includes(req.user.id)) {
      console.log('User has already marked this review as unhelpful');
      return res.status(400).json({
        message: 'You have already marked this review as unhelpful',
      });
    }

    review.unhelpfulVoters.push(req.user.id);
    review.unhelpfulCount = review.unhelpfulVoters.length;
    console.log('Updated unhelpful voters:', review.unhelpfulVoters);

    // Remove from helpful if user previously marked as helpful
    review.helpfulVoters = review.helpfulVoters.filter(
      (userId) => userId.toString() !== req.user.id
    );
    review.helpfulCount = review.helpfulVoters.length;
    console.log('Updated helpful voters:', review.helpfulVoters);

    await review.save();
    console.log('Review updated successfully:', review);
    res.json(review);
  } catch (error) {
    console.error('Error updating review:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
