const request = require('request');
const {API_KEY, FUNCTION_TYPE} = require('../constants/constants');

const getStockDailyData = async (symbol, callback) => {
    const url = 'https://www.alphavantage.co/query?function='+FUNCTION_TYPE+'&symbol='+symbol+'&apikey='+API_KEY;
    await request({ url, json: true }, (error, { body }) => {
        if (error) callback('Unable to connect to the stock market service!', undefined);
        else if (body.error || body['Error Message'])  callback('Unable to find stock', undefined);
        else callback(undefined, body)
    })
};

module.exports = getStockDailyData;