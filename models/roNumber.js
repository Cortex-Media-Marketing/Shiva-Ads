const mongoose = require('mongoose');
const config = require("../nodedetails/config");

const roNumberSchema = new mongoose.Schema({

    roNumber: { type: Number },
    invoiceNumber: { type: Number },

}, { versionKey: false, timestamps: true })

roNumberSchema.index({ roNumber: 1 })

module.exports = mongoose.model('RONumber', roNumberSchema, config.dbPrefix + 'REBMUNOR')