const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inventory', InventorySchema);
