const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const distriBand = new mongoose.Schema({
    distriName:{type:String,required:true},
    clientId:{type:String,required:true},
    programId:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

distriBand.index({distriBandType:1})

module.exports = mongoose.model('distriBandSchema', distriBand,  config.dbPrefix+'AMEHCSDNABIRTSID')