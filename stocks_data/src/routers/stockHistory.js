const express = require('express');
const StockHistory = require('../models/stockHistory');
const router = new express.Router();

router.post('/insertStockHistory', (req, res) => {
    const stockHistory = new StockHistory(req.body);
    const {symbol, date} = req.body;
    StockHistory.findOne({symbol: symbol, date: date}, (err, existsStockHistory) => {
        if (err) return console.log("something is wrong: " + err);
        if (existsStockHistory) {
            console.log("The stock history already exists");
            return res.status(401).send(existsStockHistory);
        }
        stockHistory.save().then(() => {
            res.status(201).send(stockHistory);
        }).catch((e) => {
            res.status(400).send(e);
        });
    });
});


router.get('/getAllStocksHistory', (req, res) => {
    StockHistory.find({}).then((stocks) => {
        res.send(stocks);
    }).catch((e) => {
        res.status(500).send(e);
    })
});

router.get('/stockHistoryById/:id', (req, res) => {
    const _id = req.params.id;
    StockHistory.findById(_id).then((stocks) => {
        if (!stocks)
            return res.status(404).send();
        res.send(stocks);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

router.get('/stockHistoryBySymbol/:symb', (req, res) => {
    const symbol = req.params.symb;
    const query = { symbol: symbol };
    StockHistory.find(query).then((stocks) => {
        if (!stocks)
            return res.status(404).send();
        res.send(stocks);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

module.exports = router;