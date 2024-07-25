const express = require('express');
const router = express.Router();
const quests = require('../models/quests');

router.get('/', (req, res, next) => {
    quests.find({}, {_id:0})
    .then(quest => {
        res.status(200).json({
            message: "player data retrieved",
            Quests: quest
        });
    })
});

router.post('/', (req, res, next) => {
    const quest = new quests({
        id: req.body.id,
        name: req.body.name,
        difficulty: req.body.difficulty,
        description: req.body.description,
        location: req.body.location,
        questStat: req.body.questStat,
        winText: req.body.winText,
        lossText: req.body.lossText,
        winEffect: req.body.winEffect,
        loseEffect: req.body.loseEffect,
        loot: req.body.loot
    });

    quest.save()
    .then(savedQuest => {
        res.status(201).json({
            message: 'quest saved successfully',
            quest: savedQuest
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'error saving the quest',
            error: error
        });
    });
});

router.put('/:id', (req, res, next)=>{
    quests.findOne({id: req.params.id}, {_id:0})
    .then(quest => {
        quest.id = req.body.id;
        quest.name = req.body.name;
        quest.difficulty = req.body.difficulty;
        quest.description = req.body.description;
        quest.location = req.body.location;
        quest.questStat = req.body.questStat;
        quest.winText = req.body.winText;
        quest.lossText = req.body.lossText;
        quest.winEffect = req.body.winEffect;
        quest.loseEffect = req.body.loseEffect;
        quest.loot = req.body.loot;

        quests.updateOne({id: req.params.id}, quest)
        .then(result => {
            res.status(204).json({
                message: 'quest updated successfully'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'error occurred updating the quest',
                error: error
            });
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'quest not found',
            error: { quest: 'error: not found'}
        });
    });
});

router.delete('/:id', (req, res, next) => {
    quests.findOne({id: req.params.id}).then(
        quest => {
            quests.deleteOne({id: req.params.id})
            .then(result => {
                res.status(204).json({
                    message: "quest deleted."
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: 'problem occurred deleting quest.',
                    error: error
                });
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'quest not found',
                error: {quest: "not found."}
            });
        });
});

module.exports = router;