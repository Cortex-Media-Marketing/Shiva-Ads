const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const busCategorySchema = new mongoose.Schema({
    businessCatName:{type:String,required:true},
    categoryId:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

busCategorySchema.index({businessCatName:1})

module.exports = mongoose.model('busCategorySchema', busCategorySchema,  config.dbPrefix+'AMEHCSYROGETACSUB')