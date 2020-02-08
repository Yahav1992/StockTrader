const mongoose = require('mongoose');
const validator = require('validator');

stockSchema = {
    name:{
        type: String,
        required: true,
        trim: true
    },
    symbol:{
        type: String,
        required: true,
        trim: true,
        uppercase: true
    }
};

module.exports = Stock = mongoose.model("Stock", stockSchema);
