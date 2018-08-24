const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    photo1URL: {type: String},
    photo2URL: {type: String},
    photo3URL: {type: String},
});

module.exports = mongoose.model('item', itemSchema);