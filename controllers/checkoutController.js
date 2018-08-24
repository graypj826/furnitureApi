const express = require('express');
const router = express.Router();

// Require models
const Checkout = require('../models/checkout');

// Index Route isn't needed here.

// Create Route
router.post('/', async (req, res) => {
    console.log('===================================================');
    console.log(req.session, ' this is req.session in the post route');
    console.log('===================================================');

    try {
        console.log(req.body, ' this is req.body');
        const createdCheckout= await Checkout.create(req.body);

        res.json({
            status: 200,
            data: createdCheckout,
        });

    } catch (err) {
        res.send(err);
    }
});

// Show/Read Route
router.get('/:id', async (req, res) => {

    try {
        const foundItem = await Item.findById(req.params.id);

        res.json({
            status: 200,
            data: foundItem,
        });

    } catch (err) {
        res.send(err);
    }
});

// Update Route
router.put('/:id', async (req, res) => {

    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.json({
            status: 200,
            data: updatedItem,
        });

    } catch (err) {
        res.send(err);
    }
});

// Destroy Route
router.delete('/:id', async (req, res) => {

    try {
        const deletedItem = await Item.findByIdAndRemove(req.params.id);

        res.json({
            status: 200,
            data: deletedItem,
        });

    } catch (err) {
        res.send(err);
    }
});

module.exports = router;