const { Schema, model } = require('mongoose');
const config = require("../nodedetails/config");

const releaseOrderOohHoardingSchema = new Schema({

  roNumber: { type: Number, default: 0 },
  roDate: { type: Date, default: new Date() },
  clientName: { type: String, required: true },
  brand: { type: String, required: true },
  campaignPeriod: { type: String, required: true },
  numberOfMonths: { type: Number, required: true },
  advertisementType: { type: String },
  location: { type: String },
  position: { type: String },
  sizeInFeet: { type: Number },
  materialType: { type: String },
  numberOfUnits: { type: Number },
  costPerUnit: { type: Number },
  totalAmount: { type: Number },
  nettAmount: { type: Number },
  discountType: { type: String, enum: ["discountPercentage", "flatDiscountAmount", "flatMediaRate"] },
  gst: { type: Number },
  printAndMountingCost: { type: Number },
  discountedAmount: { type: Number },
  totalPayable: { type: Number },
  attachedFile: { type: String },
  note: { type: String },
  clientDiscountType: { type: String, enum: ["percentageFromTotalAmount", "flatDiscount", "flatRate"] },
  clientRate: { type: Number },
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
  billValue4Client: { type: Number }

}, { versionKey: false, timestamps: true })

module.exports = model('ReleaseOrderOohHoarding', releaseOrderOohHoardingSchema, config.dbPrefix + 'GNIDRAOHHOOREDROESAELER')