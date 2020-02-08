const express = require('express');
const router = new express.Router();
const Stock = require('../models/stock');

router.post('/stocks', (req, res) => {
    const stock = new Stock(req.body);
    const querySymbol = req.body.symbol;

    Stock.findOne({symbol: querySymbol}, (err,existsStock) => {
        if (err) return console.log("something is wrong: " + err);
        if (existsStock) {
            console.log("This stock already exists");
            return res.status(401).send(existsStock);
        }
        stock.save().then(() => {
            res.status(201).send(stock);
        }).catch((e) => {
            res.status(400).send(e);
        })
    });
});

router.get('/stocks', (req, res) => {
    Stock.find({}).then((stocks) => {
        res.send(stocks);
    }).catch((e) => {
        res.status(500).send(e);
    })
});
router.get('/stocks/:id', (req, res) => {
    const _id = req.params.id;
    Stock.findById(_id).then((stock) => {
        if (!stock)
            return res.status(404).send();
        res.send(stock);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

module.exports = router;