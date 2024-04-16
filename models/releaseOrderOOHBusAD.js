const { Schema, model } = require('mongoose');
const config = require("../nodedetails/config");

const releaseOrderOohBusADSchema = new Schema({

  roNumber: { type: Number, default: 0 },
  roDate: { type: Date, default: new Date() },
  clientName: { type: String, required: true },
  brand: { type: String, required: true },
  campaignPeriod: { type: String, required: true },
  numberOfMonths: { type: Number, required: true },
  advertisementType: { type: String },
  place: { type: String },
  position: { type: String },
  numberOfBuses: { type: Number },
  costPerMonthPerBus: { type: Number },
  totalAmount: { type: Number },
  discountType: { type: String, enum: ["discountPercentage", "flatDiscountAmount", "flatMediaRate"] },
  nettAmount: { type: Number },
  gst: { type: Number },
  totalPayable: { type: Number },
  printAndMountingCost: { type: Number },
  discountedAmount: { type: Number },
  note: { type: String },
  attachedFile: { type: String },
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

module.exports = model('ReleaseOrderOohBusAD', releaseOrderOohBusADSchema, config.dbPrefix + 'ADSUBHOOREDROESAELER')