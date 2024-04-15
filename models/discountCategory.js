const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const discountCategorySchema = new mongoose.Schema({

    name: { type: String, required: true },

}, { versionKey: false, timestamps: true })

discountCategorySchema.index({ name: 1 })

module.exports = mongoose.model('DiscountCategory', discountCategorySchema, config.dbPrefix + 'YROGETACTNUOCSID')