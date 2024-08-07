const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FDADataSchema = new Schema(
  {
    drugName: {
      type: String,
      required: true,
    },
    shortageStatus: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FDAData', FDADataSchema);
