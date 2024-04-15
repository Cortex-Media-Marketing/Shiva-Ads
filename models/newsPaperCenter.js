const mongoose = require('mongoose');
const config = require("../nodedetails/config");

const newsPaperCenterSchema  = new mongoose.Schema({

    "name": {
        type: String,
        default: ""
    }


}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('NewsPaperCenter', newsPaperCenterSchema , config.dbPrefix + 'RETNECREPAPSWEN')