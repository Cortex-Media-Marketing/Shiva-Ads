const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const designationSchema = new mongoose.Schema({
    desName:{type:String,required:true},
    depId:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

designationSchema.index({desName:1})

module.exports = mongoose.model('designationSchema', designationSchema,  config.dbPrefix+'AMEHCSNOITANGISED')