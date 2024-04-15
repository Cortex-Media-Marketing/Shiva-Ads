const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');
const nodeValidator = require("../common/masterValidationCheck")
const common = require("../common/encDec")

//bank -c
router.post('/crtBank', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtBank);
router.get('/lstBank', common.tokenMiddleVerify,masterController.lstBank);
router.patch('/updBank', nodeValidator.postValidation,masterController.updBank);
router.delete('/delBank/:id', common.tokenMiddleVerify,masterController.delBank);

//adsIssueType -c
router.post('/crtIssueType', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtIssueType);
router.get('/lstIssueType',common.tokenMiddleVerify, masterController.lstIssueType);
router.patch('/updIssueType',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updIssueType);
router.delete('/delIssueType/:id', common.tokenMiddleVerify,masterController.delIssueType);



module.exports = router;