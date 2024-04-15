const mongoose = require("mongoose");
const config = require("../nodedetails/config");

const theaterOnSrnSchema = new mongoose.Schema({
    roNumber: { type: String, required: true },
    clientName: { type: String, required: true },
    brandName: { type: String, required: true },
    theaterName: { type: String, required: true },
    theaterAddress: { type: String, required: true },
    campaingPeriod: { type: Array, required: true },
    campCount: { type: String, required: true },
    noOfWeeks: { type: String, required: true },
    noOfScreens: { type: String, required: true },
    addDuration: { type: String, required: true },
    position: { type: String, required: true },
    content: { type: String, required: true },
    theaterList: { type: String, required: true },
    theaterListUrl: { type: String, default: "" },
    totalAmount: { type: Number, required: true },
    discountType: { type: String, required: true },
    discountValue: { type: Number, required: true },
    netAmount: { type: Number, required: true },
    gstAmount: { type: Number, required: true },
    totalPayable: { type: Number, required: true },
    clntTotalAmount: { type: Number, required: true },
    clntDisType: { type: String, required: true },
    clntDisValue: { type: Number, required: true },
    disValue: { type: Number, required: true },
    clntNetAmt: { type: Number, required: true },
    clntGst: { type: Number, required: true },
    clntBillVal: { type: Number, required: true },
    note: { type: String, required: true },
    isRoGenerated: { type: Boolean, default: false },
    roUrl: { type: String, default: null },
    attachmentUrl: { type: String, default: "" }

}, { versionKey: false, timestamps: true })

theaterOnSrnSchema.index({ clientName: 1, roNumber: 1 })

module.exports = mongoose.model('theaterOnSrnSchema', theaterOnSrnSchema, config.dbPrefix + 'AMEHCSNRSNORETAEHT')