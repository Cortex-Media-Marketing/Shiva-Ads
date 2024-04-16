const mongoose = require("mongoose");
const config = require("../nodedetails/config");

const fctRadioSchema = new mongoose.Schema({

    companyName: { type: mongoose.Schema.Types.ObjectId, required: true },
    station: { type: mongoose.Schema.Types.ObjectId, required: true },
    agcyNmeForBill: { type: Array, required: true },
    advertiseName: { type: Array, required: true },
    brandName: { type: Array, required: true },
    campStartDate: { type: Array, required: true },
    campEndDate: { type: Array, required: true },
    campDates: { type: Array, required: true },
    rateSec: { type: Array, required: true },
    timeBand: { type: Array, required: true },
    adDuration: { type: Array, required: true },
    spotsPerSec: { type: Array, required: true },
    totalSpots: { type: Array, required: true },
    totalSec: { type: Array, required: true },
    netAmount: { type: Array, required: true },
    gstAmount: { type: Array, required: true },
    payAftTax: { type: Array, required: true },
    tagLine: { type: Array, required: true },
    note: { type: Array, required: true },
    chequeDetail: { type: Array, required: true },
    isRoGenerated: { type: Boolean, default: false },
    roUrl: { type: String, default: null },

})

fctRadioSchema.index({ clientName: 1 })

module.exports = mongoose.model('fctRadioSchema', fctRadioSchema, config.dbPrefix + 'AMEHCSOIDARTCF')