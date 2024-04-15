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


//schema -c
router.post('/crtSchema', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtSchema);
router.get('/lstSchema', common.tokenMiddleVerify,masterController.lstSchema);
router.patch('/updSchema', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.updSchema);
router.delete('/delSchema/:id',common.tokenMiddleVerify, masterController.delSchema);

//category -c
router.post('/crtCategory',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.crtCategory);
router.get('/lstCategory', common.tokenMiddleVerify,masterController.lstCategory);
router.patch('/updCategory',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updCategory);
//delCheck
router.delete('/delCategory/:id',common.tokenMiddleVerify,  masterController.delCategory);

//BusinessCategory -  
router.post('/crtBusCategory', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtBusCategory);
router.get('/lstBusCategory', common.tokenMiddleVerify, masterController.lstBusCategory);
router.patch('/updBusCategory',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updBusCategory);
router.delete('/delBusCategory/:id', common.tokenMiddleVerify,masterController.delBusCategory);


module.exports = router;