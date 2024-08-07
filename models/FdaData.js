const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FdaDataSchema = new Schema({
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
});

module.exports = mongoose.model('FdaData', FdaDataSchema);
