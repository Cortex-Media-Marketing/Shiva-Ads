const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const bankSchema = new mongoose.Schema({
    bankName: {type: String,required: true },
    createdAt: { type: Date, default: Date.now },
},{ versionKey: false })

bankSchema.index({ bankName: 1})

module.exports = mongoose.model('bankModel', bankSchema,  config.dbPrefix+'AMEHCSKNAB')