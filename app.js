const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  process.env.MONGO_URI,

  {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  }
);

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const userRoutes = require('./routes/user');
const inventoryRoutes = require('./routes/inventory');
const orderRoutes = require('./routes/order');
const supplierRoutes = require('./routes/supplier');
const fdaDataRoutes = require('./routes/fdaData');
const authRoutes = require('./routes/auth');
const drugShortageRoutes = require('./routes/drugShortage.js');
const buyerRoutes = require('./routes/buyer');
const reviewRoutes = require('./routes/review');
const dashboardRoutes = require('./routes/dashboard');

app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/fda-data', fdaDataRoutes);
app.use('/api/drug-shortages', drugShortageRoutes);
app.use('/api/reviews', reviewRoutes);

app.use('/api', authRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
