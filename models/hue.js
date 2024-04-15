const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const hueSchema = new mongoose.Schema({
    hueData:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

hueSchema.index({hueData:1})

module.exports = mongoose.model('hueSchema', hueSchema,  config.dbPrefix+'AMEHCSEUH')