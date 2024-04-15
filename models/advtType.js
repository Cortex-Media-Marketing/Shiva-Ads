const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const advtTypeSchema = new mongoose.Schema({
    adsType:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

advtTypeSchema.index({adsType:1})

module.exports = mongoose.model('advtTypeSchema', advtTypeSchema,  config.dbPrefix+'AMEHCSEPYTTVDA')