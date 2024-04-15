const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const schemaModel = new mongoose.Schema({
    schemaName:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

schemaModel.index({issueTypeName:1})

module.exports = mongoose.model('schemaModel', schemaModel,  config.dbPrefix+'LEDOMAMEHCS')