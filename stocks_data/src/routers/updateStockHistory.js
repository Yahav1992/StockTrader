const express = require('express');
const router = new express.Router();
const getStockDailyData = require('../syncToDb/stock');
const request = require('request');

router.get('/updateStocksHistory/:symbol', (req, res) => {
    const symbol = req.params.symbol;
    if (!symbol) res.status(401).send("no such stock");
    getStockDailyData(symbol, (error, data) => {
            if (!error) {
                const rawData = data['Time Series (Daily)'];
                const dates = Object.keys(rawData);
                const allStockPrices = Object.values(rawData);
                const stockClosePrices = allStockPrices.map((ele) => ele['4. close']);
                const arrOfPromises = dates.map(function (date, index) {
                    return new Promise((resolve) => {
                        request({
                            url: 'http://localhost:3000/stockHistory',
                            method: 'POST',
                            json: true,
                            body: {
                                "symbol": symbol,
                                "date": date,
                                "closePrice": stockClosePrices[index]
                            }
                        }, function (error, response, body) {
                            if (error) console.error('upload failed:', error);
                            resolve(date)
                        });
                    })
                });
                Promise.all(arrOfPromises).then(values => {
                    console.log('Upload successful!\ndates updated: ' + values);
                    res.status(200).send("success");
                });
            } else res.status(401).send(error);

        }
    );
});

module.exports = router;

//
// router.get('/updateStocksHistory', (req, res) => {
//     getStockDailyData('BLMIF', (error, data) => {
//         const rawData = data['Time Series (Daily)'];
//         const dates = Object.keys(rawData);
//         const allStockPrices = Object.values(rawData);
//         const stockClosePrices = allStockPrices.map((ele) => ele['4. close']);
//         const arrOfPromises = dates.map(function(item, index) {
//
//             return new Promise((resolve) => {
//                 for (let exKey in rawData) {
//                     theData = request({
//                         url: 'http://localhost:3000/stockHistory',
//                         method: 'POST',
//                         json: true,
//                         body: {
//                             "symbol": "BLMIF",
//                             "date": exKey,
//                             "closePrice": rawData[exKey]['4. close']
//                         }
//                     }, function (error, response, body) {
//                         if (error) console.error('upload failed:', error);
//                     });
//                 }
//             });
//             Promise.all(updateOperation);
//             console.log('Upload successful!');
//             res.status(200).send("success");
//         });
//     });