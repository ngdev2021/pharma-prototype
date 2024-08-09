const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    required: false,
    enum: ['Active', 'Inactive', 'Pending'],
  },
  contactInfo: String,
  address: String,
  itemsSupplied: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
  ],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

module.exports = mongoose.model('Supplier', SupplierSchema);
