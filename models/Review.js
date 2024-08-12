const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultAvatar =
  'https://pngtree.com/freepng/character-default-avatar_5407167.html';

const ReviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userInitials: {
      type: String,
    },
    userName: {
      type: String,
    },
    title: {
      type: String,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
    unhelpfulCount: {
      type: Number,
      default: 0,
    },
    helpfulVoters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    unhelpfulVoters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    avatar: {
      type: String, // URL to the image file
      default: defaultAvatar,
    },
    productName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Review || mongoose.model('Review', ReviewSchema);
