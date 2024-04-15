const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const theaterSchema = new mongoose.Schema({
    theaterName: {type: String,required: true },
    addrLine1: {type: String,required: true },
    dist: {type: String,required: true },
    state: {type: String,required: true },
    createdAt: { type: Date, default: Date.now },
},{ versionKey: false })

theaterSchema.index({ theaterName: 1})

module.exports = mongoose.model('theaterSchema', theaterSchema,  config.dbPrefix+'AMEHCSRETAEHT')