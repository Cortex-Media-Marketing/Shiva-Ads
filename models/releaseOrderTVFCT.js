const { Schema, model } = require('mongoose');
const config = require("../nodedetails/config");

const releaseOrderTVFCTSchema = new Schema({

  roNumber: { type: Number, default: 0 },
  roDate: { type: Date, default: new Date() },
  companyName: { type: String },
  clientName: { type: String },
  clientId: { type: String },
  channel: { type: String },
  agencyNameForBilling: { type: String },
  advertiserNameForBilling: { type: String },
  brandName: { type: String },
  campaignStartDate: { type: Date },
  campaignEndDate: { type: Date },
  campaignDays: { type: Number },
  ratePer10Secs: { type: Number },
  timeBand: { type: String },
  adDuration: { type: Number },
  spotsPerDay: { type: Number },
  totalSpots: { type: Number },
  totalSeconds: { type: Number },
  nettAmount: { type: Number },
  gst: { type: Number },
  totalPayableAfterTaxes: { type: Number },
  tagLine: { type: String },
  attachedFile: { type: String },
  note: { type: String },
  //clientBilling: {
  clientRate: { type: Number },
  clientDiscountType: { type: String, enum: ["TenSecRate4Client", "flatDiscount4Client", "flatRate4Client"] },
  discountedValue4Client: { type: Number },
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
  // }

}, { versionKey: false, timestamps: true })

module.exports = model('ReleaseOrderOfTVFCT', releaseOrderTVFCTSchema, config.dbPrefix + 'TCFVTFOREDROESAELER')