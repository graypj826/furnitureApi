const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
    totalCost: Number,
});

module.exports = mongoose.model('checkout', CheckoutSchema);