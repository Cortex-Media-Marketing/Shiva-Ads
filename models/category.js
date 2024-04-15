const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const categorySchema = new mongoose.Schema({
    categoryName:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

categorySchema.index({categoryName:1})

module.exports = mongoose.model('categorySchema', categorySchema,  config.dbPrefix+'AMEHCSYROGETAC')