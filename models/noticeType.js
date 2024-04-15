const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const noticeTypeSchema = new mongoose.Schema({

    name: { type: String, required: true },

}, { versionKey: false, timestamps: true })

noticeTypeSchema.index({ name: 1 })

module.exports = mongoose.model('NoticeType', noticeTypeSchema, config.dbPrefix + 'EPYTECITON')