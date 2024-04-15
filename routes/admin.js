const express = require('express');
const route = express.Router();
const { register, login, verifyForgotPassword, forgotPassword, addRecords, findRecord, verifyAccount, addContactType, ListOfContactType, addDesignation, ListOfDesignation, addNewsPaper, ListOfNewsPaper, updateNewsPaper, deleteNewsPaper, addNewsPaperCenter, updateNewsPaperCenter, deleteNewsPaperCenter, ListOfNewsPaperCenter, addDiscountCategory, updateDiscountCategory, deleteDiscountCategory, ListOfDiscountCategory, addNoticeType, updateNoticeType, deleteNoticeType, ListOfNoticeType, addGST, updateGST, deleteGST, ListOfGSTs, uploadMultipleFiles } = require("../controllers/adminConfig");
const { Validation } = require('../common/validation');
const { tokenMiddleVerify } = require('../common/encDec');
const multer = require('multer');
const storage = multer.memoryStorage();
const s3upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 } });


route.post('/upload',s3upload.any(), uploadMultipleFiles); 

route.post('/signUp',Validation, register); 

route.get('/verify_account/:id', verifyAccount); 

route.post('/signIn',Validation, login);

route.post('/forgot_password', Validation,forgotPassword);

route.post('/verify_forgot_password',Validation, verifyForgotPassword);

//============================================ Email Template ======================================================

route.post('/add_email_template',tokenMiddleVerify,Validation,  addRecords);

route.post('/find_email_template', findRecord);



route.post('/add_contact_type',tokenMiddleVerify,Validation, addContactType);

route.get('/list_of_contact_type',tokenMiddleVerify, ListOfContactType);

route.post('/add_designation',tokenMiddleVerify,Validation, addDesignation);

route.get('/list_of_designation',tokenMiddleVerify, ListOfDesignation);

//============================================ News Paper ======================================================

route.post('/addNewsPaper',tokenMiddleVerify,Validation, addNewsPaper);

route.patch('/editNewsPaper',tokenMiddleVerify,Validation, updateNewsPaper);

route.delete('/deleteNewsPaper/:id',tokenMiddleVerify, deleteNewsPaper);

route.get('/listOfNewsPaper',tokenMiddleVerify, ListOfNewsPaper);

//============================================ News Paper Center ======================================================

route.post('/addNewsPaperCenter',tokenMiddleVerify,Validation, addNewsPaperCenter);

route.patch('/editNewsPaperCenter',tokenMiddleVerify,Validation, updateNewsPaperCenter);

route.delete('/deleteNewsPaperCenter/:id',tokenMiddleVerify, deleteNewsPaperCenter);

route.get('/listOfNewsPaperCenter',tokenMiddleVerify, ListOfNewsPaperCenter);

//============================================ Discount Category ======================================================

route.post('/addDiscountCategory',tokenMiddleVerify,Validation, addDiscountCategory);

route.patch('/editDiscountCategory',tokenMiddleVerify,Validation, updateDiscountCategory);

route.delete('/deleteDiscountCategory/:id',tokenMiddleVerify, deleteDiscountCategory);

route.get('/listOfDiscountCategory',tokenMiddleVerify, ListOfDiscountCategory);


//============================================ Notice Type ======================================================

route.post('/addNoticeType',tokenMiddleVerify,Validation, addNoticeType);

route.patch('/editNoticeType',tokenMiddleVerify,Validation, updateNoticeType);

route.delete('/deleteNoticeType/:id',tokenMiddleVerify, deleteNoticeType);

route.get('/listOfNoticeType',tokenMiddleVerify, ListOfNoticeType);


//============================================  GST ======================================================

route.post('/addGST',tokenMiddleVerify,Validation, addGST);

route.patch('/editGST',tokenMiddleVerify,Validation, updateGST);

route.delete('/deleteGST/:id',tokenMiddleVerify, deleteGST);

route.get('/listOfGST',tokenMiddleVerify, ListOfGSTs);

module.exports = route;