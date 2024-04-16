const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const pageNoSchema = new mongoose.Schema({
    pageData:{type:String,required:true},
    issueId:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

pageNoSchema.index({pageData:1})

module.exports = mongoose.model('pageNoSchema', pageNoSchema,  config.dbPrefix+'AMEHCSONEGAP')