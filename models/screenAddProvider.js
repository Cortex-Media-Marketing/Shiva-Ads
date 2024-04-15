const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const screenAddProvSchema = new mongoose.Schema({
    scrnId: {type: String,required: true },
    disName: {type: String,required: true },
    usrName: {type: String,required: true },
    createdAt: { type: Date, default: Date.now },
},{ versionKey: false })

screenAddProvSchema.index({ usrName: 1})

module.exports = mongoose.model('screenAddProvSchema', screenAddProvSchema,  config.dbPrefix+'AMEHCSDDANEERCS')