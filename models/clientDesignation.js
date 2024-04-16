const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const designationSchema = new mongoose.Schema({

    name: { type: String, required: true },

}, { versionKey: false, timestamps: true })

designationSchema.index({ name: 1 })

module.exports = mongoose.model('Designation', designationSchema, config.dbPrefix + 'NOITANGISED')