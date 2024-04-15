const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const screenSchema = new mongoose.Schema({
    screen: {type: String,required: true },
    createdAt: { type: Date, default: Date.now },
},{ versionKey: false })

screenSchema.index({ screen: 1})

module.exports = mongoose.model('screenSchema', screenSchema,  config.dbPrefix+'AMEHCSNEERCS')