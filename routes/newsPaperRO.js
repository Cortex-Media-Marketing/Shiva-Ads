const express = require('express');
const NewsPaperRO = express.Router();

const { Validation } = require('../common/validation');
const { tokenMiddleVerify } = require('../common/encDec');
const { addNewsPaperRO, updateNewsPaperRODetail, fetchNewsPaperRODetail, fetchNewsPaperROList, deleteNewsPaperRO, cancelledNewsPaperROList, shiftedNewsPaperROList, newsPaperROList, newsPaperROShiftCancelList, addADVTShiftingNPRO, updateADVTShiftingNPRO, fetchNewsPaperROGenerated } = require('../controllers/releaseOrderNewsPaperConfig');

NewsPaperRO.post('/addNewsPaperRO',tokenMiddleVerify,Validation, addNewsPaperRO); 

NewsPaperRO.patch('/updateNewsPaperRO',tokenMiddleVerify ,Validation, updateNewsPaperRODetail); 

NewsPaperRO.get('/newsPaperROInfo/:id',tokenMiddleVerify , fetchNewsPaperRODetail); 

NewsPaperRO.get('/isRoGenerated/:id',tokenMiddleVerify , fetchNewsPaperROGenerated); 

NewsPaperRO.post('/newsPaperROList',tokenMiddleVerify , newsPaperROList); 

NewsPaperRO.post('/newsPaperROShiftCancelList',tokenMiddleVerify , newsPaperROShiftCancelList); 

NewsPaperRO.post('/shiftedNewspaperROList',tokenMiddleVerify , shiftedNewsPaperROList); 

NewsPaperRO.post('/cancelledNewspaperROList',tokenMiddleVerify , cancelledNewsPaperROList); 

NewsPaperRO.delete('/deleteNewsPaperRO/:id',tokenMiddleVerify , deleteNewsPaperRO); 
// ADVT Shifting
NewsPaperRO.post('/addADVTShiftingNPRO',tokenMiddleVerify,Validation, addADVTShiftingNPRO); 

NewsPaperRO.patch('/updateADVTShiftingNPRO',tokenMiddleVerify ,Validation, updateADVTShiftingNPRO); 

NewsPaperRO.get('/advtShiftingNPRO/:id',tokenMiddleVerify , fetchNewsPaperRODetail); 

NewsPaperRO.post('/advtShiftingNPROList',tokenMiddleVerify , newsPaperROList); 

module.exports = NewsPaperRO;