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

//Advt Type -c
router.post('/crtAdvtType',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.crtAdvtType);
router.get('/lstAdvtType',common.tokenMiddleVerify, masterController.lstAdvtType);
router.patch('/updAdvtType',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updAdvtType);
router.delete('/delAdvtType/:id', common.tokenMiddleVerify,masterController.delAdvtType);

//Data source -c 
router.post('/crtDataSource', nodeValidator.postValidation,common.tokenMiddleVerify, masterController.crtDataSource);
router.get('/lstDataSource', common.tokenMiddleVerify,masterController.lstDataSource);
router.patch('/updDataSource',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updDataSource);
router.delete('/delDataSource/:id',common.tokenMiddleVerify, masterController.delDataSource);

//Ads Hue -c
router.post('/crtHue',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.crtHue);
router.get('/lstHue',common.tokenMiddleVerify, masterController.lstHue);
router.patch('/updHue',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updHue);
router.delete('/delHue/:id', common.tokenMiddleVerify,masterController.delHue);

//Page
router.post('/crtPage', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtPage);
router.get('/lstPage',common.tokenMiddleVerify, masterController.lstPage);
router.patch('/updPage', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.updPage);
router.delete('/delPage/:id',common.tokenMiddleVerify, masterController.delPage);


//Department
router.post('/crtDepartment', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtDepartment);
router.get('/lstDepartment',common.tokenMiddleVerify, masterController.lstDepartment);
router.patch('/updDepartment',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updDepartment);
router.delete('/delDepartment/:id', masterController.delDepartment);


//Designation -c 
router.post('/crtDesignation', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtDesignation);
router.get('/lstDesignation', common.tokenMiddleVerify,masterController.lstDesignation);
router.patch('/updDesignation',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updDesignation);
router.delete('/delDesignation/:id', masterController.delDesignation);

//malarType
router.post('/crtSubIssueType', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtSubIssueType);
router.get('/lstSubIssueType',common.tokenMiddleVerify, masterController.lstSubIssueType);
router.patch('/updSubIssueType',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updSubIssueType);
router.delete('/delSubIssueType/:id',common.tokenMiddleVerify, masterController.delSubIssueType);

//Advt Position
router.post('/crtAdvtPosition',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.crtAdvtPosition);
router.get('/lstAdvtPosition',common.tokenMiddleVerify, masterController.lstAdvtPosition);
router.patch('/updAdvtPosition', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.updAdvtPosition);
router.delete('/delAdvtPosition/:id', common.tokenMiddleVerify,masterController.delAdvtPosition);

//Press Reporter - need add provider data for news paper
router.post('/crtPressReport',nodeValidator.postValidation,common.tokenMiddleVerify,  masterController.crtPressReport);
router.get('/lstPressReport', common.tokenMiddleVerify,masterController.lstPressReport);
router.patch('/updPressReport', nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updPressReport);
router.delete('/delPressReport/:id',common.tokenMiddleVerify, masterController.delPressReport);

//Edition Type

router.post('/crtEditionTyp', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtEditionTyp);
router.get('/lstEditionTyp', common.tokenMiddleVerify,masterController.lstEditionTyp);
router.patch('/updEditionTyp',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updEditionTyp);
router.delete('/delEditionTyp/:id',common.tokenMiddleVerify, masterController.delEditionTyp);

//Advt edition - double look - waiting for newspaper list
 
router.post('/crtAdvtEdition', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtAdvtEdition);
router.get('/lstAdvtEdition', common.tokenMiddleVerify,masterController.lstAdvtEdition);
router.patch('/updAdvtEdition',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updAdvtEdition);
router.delete('/delAdvtEdition/:id',common.tokenMiddleVerify, masterController.delAdvtEdition);

//ClassifiedsHeading 
router.post('/crtSubHeading', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtSubHeading);
router.get('/lstSubHeading', common.tokenMiddleVerify,masterController.lstSubHeading);
router.patch('/updSubHeading',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updSubHeading);
router.delete('/delSubHeading/:id',common.tokenMiddleVerify, masterController.delSubHeading);

//FM program list 
router.post('/crtFMProgram', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtFMProgram);
router.get('/lstFMProgram', common.tokenMiddleVerify,masterController.lstFMProgram);
router.patch('/updFMProgram', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.updFMProgram);
router.delete('/delFMProgram/:id',common.tokenMiddleVerify, masterController.delFMProgram);

//Distribution_band  - double lookup waiting for clientId
router.post('/crtDisBand',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.crtDisBand);
router.get('/lstDisBand',common.tokenMiddleVerify, masterController.lstDisBand);
router.patch('/updDisBand', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.updDisBand);
router.delete('/delDisBand/:id',common.tokenMiddleVerify, masterController.delDisBand);

//Brand - lookup waiting for clientId
router.post('/crtBrand',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.crtBrand);
router.get('/lstBrand',common.tokenMiddleVerify, masterController.lstBrand);
router.patch('/updBrand',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updBrand);
router.delete('/delBrand/:id', common.tokenMiddleVerify,masterController.delBrand);

//s2Events  - look waiting for clientId
router.post('/crts2Events',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.crts2Events);
router.get('/lsts2Events',common.tokenMiddleVerify, masterController.lsts2Events);
router.patch('/upds2Events',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.upds2Events);
router.delete('/dels2Events/:id',common.tokenMiddleVerify, masterController.dels2Events);

//Ads category
router.post('/crtAdsCategory', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtAdsCategory);
router.get('/lstAdsCategory', common.tokenMiddleVerify,masterController.lstAdsCategory);
router.patch('/updBusAdsCategory', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.updBusAdsCategory);
router.delete('/delBusAdsCategory/:id', masterController.delBusAdsCategory);

//Advt Edition Type - lookup

router.post('/crtAdvtEditionType', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.crtAdvtEditionType);
router.get('/lstAdvtEditionType', common.tokenMiddleVerify,masterController.lstAdvtEditionType);
router.patch('/updAdvtEditionType', nodeValidator.postValidation,common.tokenMiddleVerify,masterController.updAdvtEditionType);
router.delete('/delAdvtEditionType/:id', masterController.delAdvtEditionType);

// Ads prov

router.post('/crtscreen',nodeValidator.postValidation,common.tokenMiddleVerify, masterController.crtscreen);
router.get('/lstscreen',common.tokenMiddleVerify, masterController.lstscreen);
router.patch('/updscreen',common.tokenMiddleVerify,nodeValidator.postValidation,common.tokenMiddleVerify, masterController.updscreen);
router.delete('/delscreen/:id',common.tokenMiddleVerify, masterController.delscreen);


module.exports = router;