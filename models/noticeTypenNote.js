const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const noticeTypeNoteSchema = new mongoose.Schema({

    noticeTypeId: { type: mongoose.Schema.Types.ObjectId,ref:'NoticeType', required: true },

    note: { type: String, required: true },

}, { versionKey: false, timestamps: true })

noticeTypeNoteSchema.index({ note: 1 })

module.exports = mongoose.model('NoticeTypeNote', noticeTypeNoteSchema, config.dbPrefix + 'ETONEPYTECITON')