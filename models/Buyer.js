const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Hospital', 'Doctor', 'Clinic', 'Government Entity'],
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  drugsNeeded: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory',
    },
  ],
});

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
