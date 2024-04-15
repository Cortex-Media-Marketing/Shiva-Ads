const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const pressReporterSchema = new mongoose.Schema({
    reporterName:{type:String,required:true},
    addProviderId:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

pressReporterSchema.index({reporterName:1})

module.exports = mongoose.model('pressReporterSchema', pressReporterSchema,  config.dbPrefix+'AMEHCSRETROPERSSERP')