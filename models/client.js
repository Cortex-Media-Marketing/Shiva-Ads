const { Schema, model } = require('mongoose');
const config = require("../nodedetails/config");

const clientSchema = new Schema({

  clientName: { type: String, required: true },
  regDate: { type: Date, default: '' },
  dataSource: { type: String, default: '' },
  //businessCategory: { type: Schema.Types.ObjectId, default: null},
  businessCategory: { type: String, default: null},
  groupCompany: { type: Boolean, default: false }, 
 // parentClient: { type: Schema.Types.ObjectId,default: '' },
  parentClient: { type: String,default: '' },
  clientType: { type: String, required: true },
  //subAgent: {  type: Schema.Types.ObjectId, default: null },
  subAgent: {  type: String, default: null },
  discount: { type: String, default: "" },
  addressLine1: { type: String, default: "" },
  addressLine2: { type: String, default: "" },
  addressLine3: { type: String, default: "" },
  country: { type: String, default: "" },
  state: { type: String, default: "" },
  district: { type: String, default: "" },
  pincode: { type: String, default: "" },
  referredBy: { type: String, default: '' },
  referredDate: { type: Date, default: '' },
  gstNo: { type: String, default: "" },
  contactNumbers: [{
    contactPerson: { type: String, default: "" },
    //designation: { type: Schema.Types.ObjectId, default: null},
    designation: { type: String, default: null},
    number: { type: String, default: "",required:true },
   // contactType: { type: Schema.Types.ObjectId, default: null },
    contactType: { type: String, default: null },
    primaryContact: { type: Boolean },
    extension: { type: String, default: "" },
    timingTo: { type: String, default: "" },
    timingFrom: { type: String, default: "" },
  }],
  contactEmails: [{
    contactPerson: { type: String, default: "" },
    email: { type: String, default: "" },
    contactType: { type: String, default: null },
    primaryContact: { type: Boolean },
    designation: { type: String, default: null }
    //designation: { type: Schema.Types.ObjectId, default: null }
   
  }]

}, { versionKey: false, timestamps: true })

module.exports = model('Client', clientSchema, config.dbPrefix + 'TNEILC')