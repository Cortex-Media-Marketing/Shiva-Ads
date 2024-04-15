const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const adsCatSchema = new mongoose.Schema({
    catName: {type: String,required: true },
    createdAt: { type: Date, default: Date.now },
},{ versionKey: false })

adsCatSchema.index({ catName: 1})

module.exports = mongoose.model('adsCatSchema', adsCatSchema,  config.dbPrefix+'AMEHCSTACSDA')