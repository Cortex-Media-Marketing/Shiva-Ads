const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const edition = new mongoose.Schema({
    editionType:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

edition.index({editionType:1})

module.exports = mongoose.model('editionSchema', edition,  config.dbPrefix+'AMEHCSNOITIDE')