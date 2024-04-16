const express = require('express');
const radioRO = express.Router();
const { Validation } = require('../common/validation');
const { tokenMiddleVerify } = require('../common/encDec');
const multer = require('multer');
const storage = multer.memoryStorage();
const s3upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 } });

const { addRadioFCT, updateRadioFCTDetail, fetchRadioFCTDetail, deleteRadioFCT, RadioFCTList, addRadioNTR, updateRadioNTRDetail, fetchRadioNTRDetail, RadioNTRList, deleteRadioNTR, addRadioNFCT, updateRadioNFCTDetail, fetchRadioNFCTDetail, RadioNFCTList, deleteRadioNFCT, addRadioRjMention, updateRadioRjMentionDetail, fetchRadioRjMentionDetail, RadioRjMentionList, deleteRadioRjMention, fetchRadioFCTGenerated, fetchRadioNTRGenerated, fetchRadioNFCTGenerated, fetchRadioRjMentionGenerated } = require('../controllers/releaseOrderRadioConfig');

///////////////////////////////////////////////////////////   Radio FCT ////////////////////////////////////////////////////

radioRO.post('/addRadioFCT',tokenMiddleVerify,s3upload.fields([{ name: 'attachmentFile', maxCount: 1 }]),Validation, addRadioFCT); 

radioRO.patch('/updateRadioFCT',tokenMiddleVerify ,s3upload.fields([{ name: 'attachmentFile', maxCount: 1 }]),Validation, updateRadioFCTDetail); 

radioRO.get('/radioFCTInfo/:id',tokenMiddleVerify , fetchRadioFCTDetail); 

radioRO.get('/isRadioFCTGenerated/:id',tokenMiddleVerify , fetchRadioFCTGenerated); 


module.exports = radioRO;