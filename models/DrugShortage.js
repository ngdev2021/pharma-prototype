// models/DrugShortage.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drugShortageSchema = new Schema({
  generic_name: String,
  company_name: String,
  contact_info: String,
  presentation: String,
  type_of_update: String,
  date_of_update: Date,
  availability_info: String,
  related_info: String,
  resolved_note: String,
  reason_for_shortage: String,
  therapeutic_category: String,
  status: String,
  change_date: Date,
  date_discontinued: Date,
  initial_posting_date: Date,
});

module.exports = mongoose.model('DrugShortage', drugShortageSchema);
