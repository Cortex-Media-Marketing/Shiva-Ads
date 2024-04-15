const mongoose = require('mongoose');
const config = require("../nodedetails/config");

const newsPaperSchema  = new mongoose.Schema({

    "name": {
        type: String,
        default: ""
    }


}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('NewsPaper', newsPaperSchema , config.dbPrefix + 'REPAPSWEN')