const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const depNameSchema = new mongoose.Schema({
    departmentName:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

depNameSchema.index({departmentName:1})

module.exports = mongoose.model('depNameSchema', depNameSchema,  config.dbPrefix+'AMEHCSEMANPED')