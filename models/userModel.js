const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: 'https://example.com/default-profile-pic.jpg',
  },
  contact: {
    type: Number,
    required: true,
  },
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  wishlist: {
    type: Array,
    default: [],
  },
  address: {
    type: String,
    default: 'No address provided',
  },
});

module.exports = mongoose.model('User', userSchema);