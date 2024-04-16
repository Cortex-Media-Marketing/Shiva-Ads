const express = require('express');
const oohRO = express.Router();

const { Validation } = require('../common/validation');
const { tokenMiddleVerify } = require('../common/encDec');
const { addOohHoarding, updateOohHoardingDetail, fetchOohHoardingDetail, oohHoardingList, deleteOohHoarding, addOohBusAd, updateOohBusAdDetail, fetchOohBusAdDetail, oohBusAdList, deleteOohBusAd, fetchOohHoardingGenerated, fetchOohBusAdROGenerated } = require('../controllers/releaseOrderOOHConfig');
const multer = require('multer');
const storage = multer.memoryStorage();
const s3upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 } });


///////////////////////////////////////////        Hoardings       /////////////////////////////////////////////////////

oohRO.post('/addOohHoarding',tokenMiddleVerify,s3upload.fields([{ name: 'attachedFile', maxCount: 1 }]),Validation, addOohHoarding); 

oohRO.patch('/updateOohHoarding',tokenMiddleVerify ,s3upload.fields([{ name: 'attachedFile', maxCount: 1 }]),Validation, updateOohHoardingDetail); 

oohRO.get('/oohHoardingInfo/:id',tokenMiddleVerify , fetchOohHoardingDetail); 

oohRO.get('/isOohHoardingRoGenerated/:id',tokenMiddleVerify , fetchOohHoardingGenerated); 

oohRO.post('/oohHoardingList',tokenMiddleVerify , oohHoardingList); 

oohRO.delete('/deleteOohHoarding/:id',tokenMiddleVerify , deleteOohHoarding); 



///////////////////////////////////////////        BusAds       /////////////////////////////////////////////////////

oohRO.post('/addOohBusAd',tokenMiddleVerify,s3upload.fields([{ name: 'attachedFile', maxCount: 1 }]),Validation, addOohBusAd); 

oohRO.patch('/updateOohBusAd',tokenMiddleVerify ,s3upload.fields([{ name: 'attachedFile', maxCount: 1 }]),Validation, updateOohBusAdDetail); 



module.exports = oohRO;