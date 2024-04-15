const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const dataSourceSchema = new mongoose.Schema({
    dataSrc:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

dataSourceSchema.index({dataSrc:1})

module.exports = mongoose.model('dataSourceSchema', dataSourceSchema,  config.dbPrefix+'AMEHCSECRUOSATAD')