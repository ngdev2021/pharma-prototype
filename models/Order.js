const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: 'Inventory',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Completed', 'Cancelled'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
