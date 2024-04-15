const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const advtPositionSchema = new mongoose.Schema({
    advtPos:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

advtPositionSchema.index({advtPos:1})

module.exports = mongoose.model('advtPositionSchema', advtPositionSchema,  config.dbPrefix+'AMEHCSNOITISOPTVDA')