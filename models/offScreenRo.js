const mongoose = require("mongoose");
const config = require("../nodedetails/config");

const theaterOffSrnSchema = new mongoose.Schema({
    roNumber: { type: String, required: true },
    clientName: { type: String, required: true },
    brandName: { type: String, required: true },
    theaterName: { type: String, required: true },
    theaterAddress: { type: String, required: true },
    campaingPeriod: { type: Array, required: true },
    noOfMonth: { type: String, required: true },
    location: { type: String, required: true },
    position: { type: String, required: true },
    size: { type: String, required: true },
    materialType: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    discountType: { type: String, required: true },
    discountValue: { type: Number, required: true },
    netAmount: { type: Number, required: true },
    gstAmount: { type: Number, required: true },
    totalPay: { type: Number, required: true },
    clntDisType: { type: String, required: true },
    clntRate: { type: Number, required: true },
    clntDisValue: { type: Number, required: true },
    clntDisAmt: { type: Number, required: true },
    clntGst: { type: Number, required: true },
    clntBillVal: { type: Number, required: true },
    note: { type: String, required: true },
    isRoGenerated: { type: Boolean, default: false },
    roUrl: { type: String, default: null },
    attachmentUrl: { type: String, default: "" }
}, { versionKey: false, timestamps: true })

theaterOffSrnSchema.index({ clientName: 1, roNumber: 1 })

module.exports = mongoose.model('theaterOffSrnSchema', theaterOffSrnSchema, config.dbPrefix + 'AMEHCSNRSFFORETAEHT')