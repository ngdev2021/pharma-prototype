const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Mock data for demonstration purposes
const dashboardOverviewData = {
  totalOrders: 120,
  pendingReviews: 10,
  notifications: 5,
};

// GET /api/dashboard/overview
router.get('/overview', auth, (req, res) => {
  try {
    res.json(dashboardOverviewData);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to load dashboard overview data' });
  }
});

// GET /api/dashboard/recent-activity
router.get('/recent-activity', auth, (req, res) => {
  try {
    // Mock recent activity data
    const recentActivity = [
      {
        id: 1,
        message: 'Order #1234 has been shipped',
        timestamp: new Date(),
      },
      {
        id: 2,
        message: 'New review posted',
        timestamp: new Date(),
      },
    ];

    res.json(recentActivity);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to load recent activity data' });
  }
});

// GET /api/dashboard/notifications
router.get('/notifications', auth, (req, res) => {
  try {
    // Mock notifications data
    const notifications = [
      {
        id: 1,
        message: 'New order received',
        timestamp: new Date(),
      },
      {
        id: 2,
        message: 'Product out of stock',
        timestamp: new Date(),
      },
    ];

    res.json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to load notifications data' });
  }
});

// GET /api/dashboard/chart-data
router.get('/chart-data', auth, (req, res) => {
  try {
    // Mock chart data
    const chartData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Orders',
          data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 80, 90, 100],
        },
      ],
    };

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load chart data' });
  }
});

module.exports = router;
