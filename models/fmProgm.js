const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const fmProgramSchema = new mongoose.Schema({
    prgName:{type:String,required:true},
    startTime:{type:String,required:true},
    endTime:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

fmProgramSchema.index({prgName:1})

module.exports = mongoose.model('fmProgramSchema', fmProgramSchema,  config.dbPrefix+'AMEHCSMARGORPMF')