const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const s2BrandSchema = new mongoose.Schema({
    brndName:{type:String,required:true},
    clientId:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

s2BrandSchema.index({businessCatName:1})

module.exports = mongoose.model('s2BrandSchema', s2BrandSchema,  config.dbPrefix+'AMEHCSDNARBOWTS')