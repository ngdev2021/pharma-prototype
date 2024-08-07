const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://ngdev21:rylan07a@cluster0.34tiicv.mongodb.net/pharma-prototype?retryWrites=true&w=majority&appName=Cluster0',
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

app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/fda-data', fdaDataRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
