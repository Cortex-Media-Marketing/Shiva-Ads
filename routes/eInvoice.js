const router = require('express').Router()
const eInvoiceRoute = require("../controllers/eInvoiceConfig");


router.post("/createEinvoice", eInvoiceRoute.createEinvoice);

router.post("/generateQr", eInvoiceRoute.generateQr);



module.exports = router