const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const issueSchema = new mongoose.Schema({
    issueTypeName:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

issueSchema.index({issueTypeName:1})
//advt Issue/malar /others
module.exports = mongoose.model('issueSchema', issueSchema,  config.dbPrefix+'AMEHCSEUSSI')