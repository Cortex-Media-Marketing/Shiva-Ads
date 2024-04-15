const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const s2EventSchema = new mongoose.Schema({
    evntName:{type:String,required:true},
    clientId:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

s2EventSchema.index({businessCatName:1})

module.exports = mongoose.model('s2EventSchema', s2EventSchema,  config.dbPrefix+'AMEHCSTNEVEOWTS')