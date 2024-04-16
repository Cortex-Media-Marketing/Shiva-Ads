const mongoose = require('mongoose');
const config = require("../nodedetails/config");

const advtShiftingNewspaperROSchema  = new mongoose.Schema({

    "npRoId": {
        type: String,
        default: ""
    },
    "originalDate": {                          // releaseDate
        type: Date,
        
    },
    "reason": {
        type: String,
        default: ""
    },
    "shiftedBy": {
        type: String,
        default: ""
    },
    "shiftedOn": {
        type: Date,
        default: ""
    },
    "shiftedRO": {
        type: Number,
        default:0
       
    },
   
    

}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('ADVTShiftingNewspaperRO', advtShiftingNewspaperROSchema , config.dbPrefix + 'ROREPAPSWENGNITFIHSTVDA')