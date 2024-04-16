const mongoose = require('mongoose');
const config = require("../nodedetails/config");

const vendorSchema = new mongoose.Schema({

    category: { type: String, required: true },
    type: { type: String },
    name: { type: String, required: true },
    providerTiming: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    addressLine3: { type: String },
    pincode: { type: String },
    state: { type: String },
    district: { type: String },
    contactNumbers: [{
        contactPerson: { type: String },
        designation: { type: String },
        primaryContact: { type: Boolean },
        contactType: { type: String },
        contactNumber: { type: String },
        extension: { type: String },
        timingFrom: { type: String },
        timingTo: { type: String }
    }],
    contactEmails: [{
        email: { type: String },
        contactPerson: { type: String },
        designation: { type: String },
        primaryContact: { type: Boolean }
    }]


}, { versionKey: false, timestamps: true })


const tvVendorSchema = new mongoose.Schema({
    companyName: { type: String },
    agencyName: { type: String },
    advertiserName: { type: String },
    brandName: { type: String },
    ...vendorSchema.obj, 
}, { versionKey: false, timestamps: true });


const radioVendorSchema = new mongoose.Schema({
    ...vendorSchema.obj, 
   brandName: { type: String },
}, { versionKey: false, timestamps: true });


const youTubeSchema = new mongoose.Schema({
    ...Object.entries(vendorSchema.obj)
        .filter(([key]) => key !== 'category' && key !== 'providerTiming')
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
        brandName: { type: String },
        channelName:{String}
}, { versionKey: false, timestamps: true });

const theatreSchema = new mongoose.Schema({
    ...Object.entries(vendorSchema.obj)
        .filter(([key]) => key !== 'category' && key !== 'providerTiming')
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
        brandName: { type: String },
       
}, { versionKey: false, timestamps: true });

const NewsPaperVendor = mongoose.model('NewsPaperVendor', vendorSchema, config.dbPrefix + 'RODNEVREPAPSWEN')






module.exports = { NewsPaperVendor}