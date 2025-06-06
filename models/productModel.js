const mongoose = require('mongoose');

const perfumesProducts = new mongoose.Schema({
    Name: { type: String, required: true},
    price: { type: Number, required: true, min: 0},
    description: { type: String, required: true},
    category: {type: String, required: true,},
},);

module.exports = mongoose.model('Products', perfumesProducts);