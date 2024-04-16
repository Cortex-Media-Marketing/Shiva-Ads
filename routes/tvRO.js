const express = require('express');
const tvRO = express.Router();

const { Validation } = require('../common/validation');
const { tokenMiddleVerify } = require('../common/encDec');
const { addTvRoFCT, updateTVROFCTDetail, fetchTVROFCTDetail, TVROFCTList, deleteTVROFCT, addTvRoSponsorship, updateTVROSponsorshipDetail, fetchTVROSponsorshipDetail, TVROSponsorshipList, deleteTVROSponsorship, fetchTvRoFCTGenerated, fetchTvRoSponsorshipGenerated } = require('../controllers/releaseOrderTVConfig');
const multer = require('multer');
const storage = multer.memoryStorage();
const s3upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 } });

tvRO.post('/addTvRoFCT',tokenMiddleVerify,s3upload.fields([{ name: 'attachedFile', maxCount: 1 }]),Validation, addTvRoFCT); 

tvRO.patch('/updateTvRoFCT',tokenMiddleVerify ,s3upload.fields([{ name: 'attachedFile', maxCount: 1 }]),Validation, updateTVROFCTDetail); 

tvRO.get('/tvRoFCTInfo/:id',tokenMiddleVerify , fetchTVROFCTDetail); 



module.exports = tvRO;