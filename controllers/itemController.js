const express = require('express');
const router = express.Router();

// Require models
const Item = require('../models/item');

// Index Route
router.get('/', async (req, res) => {
    console.log(req.session, ' this is get all');

    try {
        const allItems = await Item.find();

        res.json({
            status: 200,
            data: allItems,
        });
        
    } catch (err) {
        res.send(err);
    }
});

// Create Route
router.post('/', async (req, res) => {
    console.log('===================================================');
    console.log(req.session, ' this is req.session in the post route');
    console.log('===================================================');

    try {
        console.log(req.body, ' this is req.body');
        const createdItem = await Item.create(req.body);

        res.json({
            status: 200,
            data: createdItem,
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