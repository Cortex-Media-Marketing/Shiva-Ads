const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const advtEdition = new mongoose.Schema({
    adsProviderId:{type:String,required:true},
    editionTypeId:{type:String,required:true},
    editionName:{type:String,required:true},
    editionState:{type:String,required:true},
    editionCity:{type:String,required:true},
    frequency:{type:String,required:true},
    mediaDisc:{type:String,required:true},
    mediaRate:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

advtEdition.index({editionName:1})

module.exports = mongoose.model('advtEditionSchema', advtEdition,  config.dbPrefix+'AMEHCSNOITIDETVDA')