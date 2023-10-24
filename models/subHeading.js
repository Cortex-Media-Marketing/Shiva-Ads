const mongoose = require('mongoose');
const config = require("../nodedetails/config");

const subHeading = new mongoose.Schema({
    headingName:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

subHeading.index({headingName:1})

module.exports = mongoose.model('subHeadingSchema', subHeading,  config.dbPrefix+'AMEHCSGNIDAEHBUS')