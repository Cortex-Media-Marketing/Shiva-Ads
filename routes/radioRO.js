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

radioRO.post('/radioFCTList',tokenMiddleVerify , RadioFCTList); 

radioRO.delete('/deleteRadioFCT/:id',tokenMiddleVerify , deleteRadioFCT); 

///////////////////////////////////////////////////////////   Radio NTR ////////////////////////////////////////////////////

radioRO.post('/addRadioNTR',tokenMiddleVerify,s3upload.fields([{ name: 'attachmentFile', maxCount: 1 }]),Validation, addRadioNTR); 

radioRO.patch('/updateRadioNTR',tokenMiddleVerify ,s3upload.fields([{ name: 'attachmentFile', maxCount: 1 }]),Validation, updateRadioNTRDetail); 

radioRO.get('/radioNTRInfo/:id',tokenMiddleVerify , fetchRadioNTRDetail); 

radioRO.get('/isRadioNTRGenerated/:id',tokenMiddleVerify , fetchRadioNTRGenerated); 

radioRO.post('/radioNTRList',tokenMiddleVerify , RadioNTRList); 

radioRO.delete('/deleteRadioNTR/:id',tokenMiddleVerify , deleteRadioNTR); 


///////////////////////////////////////////////////////////   Radio NFCT ////////////////////////////////////////////////////

radioRO.post('/addRadioNFCT',tokenMiddleVerify,s3upload.fields([{ name: 'attachmentFile', maxCount: 1 }]),Validation, addRadioNFCT); 

radioRO.patch('/updateRadioNFCT',tokenMiddleVerify ,s3upload.fields([{ name: 'attachmentFile', maxCount: 1 }]),Validation, updateRadioNFCTDetail); 

radioRO.get('/radioNFCTInfo/:id',tokenMiddleVerify , fetchRadioNFCTDetail); 

radioRO.get('/isRadioNFCTGenerated/:id',tokenMiddleVerify , fetchRadioNFCTGenerated); 

radioRO.post('/radioNFCTList',tokenMiddleVerify , RadioNFCTList); 

radioRO.delete('/deleteRadioNFCT/:id',tokenMiddleVerify , deleteRadioNFCT); 

///////////////////////////////////////////////////////////   Radio RjMention ////////////////////////////////////////////////////

radioRO.post('/addRadioRJ',tokenMiddleVerify,s3upload.fields([{ name: 'attachmentFile', maxCount: 1 }]),Validation, addRadioRjMention); 

radioRO.patch('/updateRadioRJ',tokenMiddleVerify ,s3upload.fields([{ name: 'attachmentFile', maxCount: 1 }]),Validation, updateRadioRjMentionDetail); 


module.exports = radioRO;