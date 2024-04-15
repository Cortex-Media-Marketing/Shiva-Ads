const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const adsEditionSchema = new mongoose.Schema({
    catId: {type: String,required: true },
    editionName: {type: String,required: true },
    createdAt: { type: Date, default: Date.now },
},{ versionKey: false })

adsEditionSchema.index({ catName: 1})

module.exports = mongoose.model('adsEditionSchema', adsEditionSchema,  config.dbPrefix+'AMEHCSNOITIDESDA')