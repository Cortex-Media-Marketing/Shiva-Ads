const mongoose = require("mongoose");
const config = require("../nodedetails/config");

const subAgent = new mongoose.Schema({

    uniqueCode:{type:String,required:true},
    name:{type:String,required:true},
    discount:{type:String,required:true},
    adrsLine1:{type:String,required:true},
    adrsLine2:{type:String,required:true},
    adrsLine3:{type:String,required:true},
    pincode:{type:String,required:true},
    district:{type:String,required:true},
    state:{type:String,required:true},
    contactNumbers: [{
        contactPerson: { type: String, default: "" },
        designation: { type: mongoose.Schema.Types.ObjectId, default: null},
        number: { type: String, default: "",required:true },
        contactType: { type: mongoose.Schema.Types.ObjectId, default: null },
        primaryContact: { type: Boolean },
        extension: { type: String, default: "" },
        timingTo: { type: String, default: "" },
        timingFrom: { type: String, default: "" },
    }],
    contactEmails: [{
        contactPerson: { type: String, default: "" },
        email: { type: String, default: "" },
        primaryContact: { type: Boolean },
        designation: { type: mongoose.Schema.Types.ObjectId, default: null }
       
    }],
    createdAt:{type:Date,default:Date.now}
},{versionKey:false})

subAgent.index({headingName:1})

module.exports = mongoose.model('subAgentSchema', subAgent,  config.dbPrefix+'AMEHCSTNEGABUS')