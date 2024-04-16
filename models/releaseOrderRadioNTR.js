const { Schema, model } = require('mongoose');
const config = require("../nodedetails/config");

const releaseOrderRadioNTRSchema = new Schema({

  roNumber: { type: Number, default: 0 },
  roDate: { type: Date, default: new Date() },
  companyName: { type: String, required: true },
  station: { type: String, required: true },
  agencyNameForBilling: { type: String, required: true },
  advertiserNameForBilling: { type: String, required: true },
  brandName: { type: String, required: true },
  campaignStartDate: { type: Date, required: true },
  campaignEndDate: { type: Date, required: true },
  campaignDays: { type: Number, required: true },
  ratePer10Secs: { type: Number, required: true },
  timeBand: { type: String },
  adDuration: { type: Number },
  ntr: { type: String },
  totalSpots: { type: Number },
  totalSeconds: { type: Number },
  nettAmount: { type: Number },
  gst: { type: Number },
  totalPayableAfterTaxes: { type: Number },
   //Add - on details starts
   coSponsor: { type: Boolean, default: false },
   csProgramDate: { type: Date },
   csSelectedPrograms: [{ type: String }],
   namingRights: { type: Boolean, default: false },
   nrProgramDate: { type: Date },
   nrSelectedPrograms: [{ type: String }],
   dayBranding: { type: Boolean, default: false },
   dbProgramDate: { type: Date },
   assocDayBranding: { type: Boolean, default: false },
   adbProgramDate: { type: Date },
    //Add - on details ends
  tagline: { type: String },
  note: { type: String },
  paymentTermsWithchequeDetails: { type: String },
  attachmentFile: { type: String },
  clientBillingRate: { type: Number },
  gst4Client: { type: Number },
  remindStatus: { type: Boolean, default: false },
  isRoGenerated: { type: Boolean, default: false },
  roUrl: { type: String, default: null },
  isClientRoGenerated: { type: Boolean, default: false },
  isVendorRoGenerated: { type: Boolean, default: false },
  clientRoUrl: { type: String, default: null },
  vendorRoUrl: { type: String, default: null },
  vendorId: { type: String },
  nett4Client: { type: Number }

}, { versionKey: false, timestamps: true })

module.exports = model('ReleaseOrderOfRadioNTR', releaseOrderRadioNTRSchema, config.dbPrefix + 'RTNOIDARFOREDROESAELER')