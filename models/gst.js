const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const GSTSchema = new mongoose.Schema({

    percent: { type: Number, required: true },

}, { versionKey: false, timestamps: true })

GSTSchema.index({ percent: 1 })

module.exports = mongoose.model('GST', GSTSchema, config.dbPrefix + 'TSG')