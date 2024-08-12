// models/DrugShortage.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  comment: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Assuming you want to track who left the feedback
  date: { type: Date, default: Date.now },
});

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
  feedback: {
    type: [FeedbackSchema],
    default: [],
  },
});

module.exports = mongoose.model('DrugShortage', drugShortageSchema);
