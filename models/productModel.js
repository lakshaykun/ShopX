const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        default: 'No description available',
    },
    bgcolor: {
        type: String,
        default: '#ffffff',
    },
    category: {
        type: String,
        required: true,
    },
    panelcolor: {
        type: String,
        default: '#ffffff',
    },
    textcolor: {
        type: String,
        default: '#000000',
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model('Product', productSchema);