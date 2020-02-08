const mongoose = require('mongoose');
const validator = require('validator');

stockHistorySchema = {
    symbol:{
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    date:{
        type: Date,
        required: true
    },
    closePrice:{
        type: Number,
        required: true
    },
};

module.exports = StockHistory = mongoose.model("stockHistory",stockHistorySchema);