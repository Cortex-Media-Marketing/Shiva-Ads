const router = require('express').Router()
const masterRoute = require("../routes/master");
const theaterRoute = require("../routes/theaterRo");
const eInvoiceRoute = require("../routes/eInvoice");


router.use('/',require('./admin'))
router.use("/master", masterRoute);
router.use("/client", require('./client'));
router.use("/agent", require('./subAgent'));
router.use("/newsPaperRO", require('./newsPaperRO'));
router.use("/vendor", require('./vendor'));
router.use("/tvRo", require('./tvRO'));
router.use("/radioRO", require('./radioRO'));
router.use("/oohRO", require('./oohRO'));
router.use("/theaterRo", theaterRoute);
router.use("/eInvoice", eInvoiceRoute);


module.exports = router