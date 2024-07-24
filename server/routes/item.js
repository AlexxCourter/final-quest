const express = require('express');
const router = express.Router();
const Items = require('../models/items');

router.get('/', (req, res, next) => {
    Items.find({}, {_id:0})
    .then(item => {
        res.status(200).json({
            message: "Items inventory retrieved",
            Items: item
        });
    })
});

router.post('/', (req, res, next) => {
    const item = new Items({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        value: req.body.value,
        effect: req.body.effect,
    });

    item.save()
    .then(savedItem => {
        res.status(201).json({
            message: 'item saved successfully',
            item: savedItem
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'error saving the item',
            error: error
        });
    });
});

router.put('/:id', (req, res, next)=>{
    Items.findOne({id: req.params.id}, {_id:0})
    .then(item => {
        item.id = req.body.id;
        item.name = req.body.name;
        item.description = req.body.description;
        item.type = req.body.type;
        item.value = req.body.value;
        item.effect = req.body.effect;

        Items.updateOne({id: req.params.id}, item)
        .then(result => {
            res.status(204).json({
                message: 'item updated successfully'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'error occurred updating the item',
                error: error
            });
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'item not found',
            error: { item: 'error: not found'}
        });
    });
});

router.delete('/:id', (req, res, next) => {
    Items.findOne({id: req.params.id}).then(
        item => {
            Items.deleteOne({id: req.params.id})
            .then(result => {
                res.status(204).json({
                    message: "item deleted."
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: 'problem occurred deleting the item.',
                    error: error
                });
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'item not found',
                error: {item: "not found."}
            });
        });
});