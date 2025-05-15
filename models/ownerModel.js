const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
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
  products: {
    type: Array,
    default: [],
  },
  gstin: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Owner', ownerSchema);