const express = require('express');
const router = express.Router();
const Player = require('../models/player');

router.get('/', (req, res, next) => {
    Player.find({}, {_id:0})
    .then(player => {
        res.status(200).json({
            message: "player data retrieved",
            playerData: player
        });
    })
});

router.post('/', (req, res, next) => {
    const player = new Player({
        name: req.body.name,
        level: req.body.level,
        exp: req.body.exp,
        hp: req.body.hp,
        maxHp: req.body.maxHp,
        atk: req.body.atk,
        def: req.body.def,
        spd: req.body.spd,
        int: req.body.int,
        luck: req.body.luck,
        gold: req.body.gold
    });

    player.save()
    .then(savedPlayer => {
        res.status(201).json({
            message: 'player data saved successfully',
            player: savedPlayer
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'error saving the player',
            error: error
        });
    });
});

router.put('/:name', (req, res, next)=>{
    Player.findOne({name: req.params.name}, {_id:0})
    .then(player => {
        player.name = req.body.name;
        player.level = req.body.level;
        player.exp = req.body.exp;
        player.hp = req.body.hp;
        player.maxHp = req.body.maxHp;
        player.atk = req.body.atk;
        player.def = req.body.def;
        player.spd = req.body.spd;
        player.int = req.body.int;
        player.luck = req.body.luck;
        player.gold = req.body.gold;

        Player.updateOne({name: req.params.name}, player)
        .then(result => {
            res.status(204).json({
                message: 'Player data updated successfully'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'error occurred updating the player',
                error: error
            });
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'player not found',
            error: { player: 'error: not found'}
        });
    });
});

router.delete('/:name', (req, res, next) => {
    Player.findOne({name: req.params.name}).then(
        player => {
            Player.deleteOne({name: req.params.name})
            .then(result => {
                res.status(204).json({
                    message: "player data deleted."
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: 'problem occurred deleting player data.',
                    error: error
                });
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'player not found',
                error: {player: "not found."}
            });
        });
});