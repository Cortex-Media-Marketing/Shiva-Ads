const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const contactTypeSchema = new mongoose.Schema({

    name:{type:String,required:true},
    
},{versionKey: false, timestamps: true})

contactTypeSchema.index({name:1})

module.exports = mongoose.model('ContactType', contactTypeSchema,  config.dbPrefix+'EPYTTCATNOC')