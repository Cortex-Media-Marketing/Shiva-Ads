const mongoose = require('mongoose');
const config = require("../nodedetails/config");

const ownerSchema  = new mongoose.Schema({

    "name": {
        type: String,
        default: ""
    },
    "type": {
        type: String,
         enum: ['shivaAds', 's2Medias']
    },
    "email": {
        type: String,
        default: ""
    },
    "password": {
        type: String,
        default: ""
    },
    "isAccountBlocked": {
        type: Boolean,
        default: false
    },
    "isAccountVerified": {
        type: Boolean,
        default: false
    },
    "isActive": {
        type: Boolean,
        default: false
    },
    
    

}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Super_Admin', ownerSchema , config.dbPrefix + 'NIMDA_REPUS')