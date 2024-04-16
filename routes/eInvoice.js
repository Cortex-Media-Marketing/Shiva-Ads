const router = require('express').Router()
const eInvoiceRoute = require("../controllers/eInvoiceConfig");


router.post("/createEinvoice", eInvoiceRoute.createEinvoice);

router.post("/generateQr", eInvoiceRoute.generateQr);

router.post("/sendMailWithAtt",eInvoiceRoute.sendMailWithAtt)

router.post("/htmlToPDF",eInvoiceRoute.htmlToPDF)


module.exports = router