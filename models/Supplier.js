const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    itemsSupplied: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: 'Inventory',
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Supplier', SupplierSchema);
