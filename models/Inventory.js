const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  itemName: String,
  drugName: String,
  supplier: String,
  quantity: Number,
  expirationDate: Date,
  price: String,
  description: String,
});

module.exports = mongoose.model('Inventory', InventorySchema);
