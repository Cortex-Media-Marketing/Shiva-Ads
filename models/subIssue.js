const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const issueSubCatSchema = new mongoose.Schema({
    issueSubCat:{type:String,required:true},
    issueId:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})
//advt issue/malar type
issueSubCatSchema.index({issueSubCat:1})

module.exports = mongoose.model('issueSubCatSchema', issueSubCatSchema,  config.dbPrefix+'AMEHCSTACBUSEUSSI')