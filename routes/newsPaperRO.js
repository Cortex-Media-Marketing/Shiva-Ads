const express = require('express');
const NewsPaperRO = express.Router();

const { Validation } = require('../common/validation');
const { tokenMiddleVerify } = require('../common/encDec');
const { addNewsPaperRO, updateNewsPaperRODetail, fetchNewsPaperRODetail, fetchNewsPaperROList, deleteNewsPaperRO, cancelledNewsPaperROList, shiftedNewsPaperROList, newsPaperROList, newsPaperROShiftCancelList, addADVTShiftingNPRO, updateADVTShiftingNPRO, fetchNewsPaperROGenerated } = require('../controllers/releaseOrderNewsPaperConfig');

NewsPaperRO.post('/addNewsPaperRO',tokenMiddleVerify,Validation, addNewsPaperRO); 

NewsPaperRO.patch('/updateNewsPaperRO',tokenMiddleVerify ,Validation, updateNewsPaperRODetail); 

NewsPaperRO.get('/newsPaperROInfo/:id',tokenMiddleVerify , fetchNewsPaperRODetail); 

NewsPaperRO.get('/isRoGenerated/:id',tokenMiddleVerify , fetchNewsPaperROGenerated); 


module.exports = NewsPaperRO;