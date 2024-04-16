const express = require('express');
const Vendor = express.Router();

const { Validation } = require('../common/validation');
const { tokenMiddleVerify } = require('../common/encDec');
const { addNewsPaperVendor, updateNewsPaperVendor, fetchNewsPaperVendor, listOfNewsPaperVendor, deleteNewsPaperVendor, addTVVendor, updateTVVendor, fetchTVVendor, listOfTVVendors, deleteTVVendor, addRadioVendor, updateRadioVendor, fetchRadioVendor, listOfRadioVendors, deleteRadioVendor, addOOHVendor, updateOOHVendor, fetchOOHVendor, listOfOOHVendors, deleteOOHVendor, addYouTubeVendor, updateYouTubeVendor, fetchYouTubeVendor, listOfYouTubeVendors, deleteYouTubeVendor, addTheatreVendor, updateTheatreVendor, fetchTheatreVendor, listOfTheatreVendors, deleteTheatreVendor, addOtherVendor, updateOtherVendor, fetchOtherVendor, listOfOtherVendors, deleteOtherVendor } = require('../controllers/vendorConfig');

Vendor.post('/addNewsPaper',tokenMiddleVerify,Validation, addNewsPaperVendor); 

Vendor.patch('/updateNewsPaper',tokenMiddleVerify ,Validation, updateNewsPaperVendor); 

Vendor.get('/NewsPaperInfo/:id',tokenMiddleVerify , fetchNewsPaperVendor); 

Vendor.post('/newsPaperVendorList',tokenMiddleVerify , listOfNewsPaperVendor); 

Vendor.delete('/deleteNewsPaper/:id',tokenMiddleVerify , deleteNewsPaperVendor); 




Vendor.post('/addTV',tokenMiddleVerify,Validation, addTVVendor); 

Vendor.patch('/updateTV',tokenMiddleVerify ,Validation, updateTVVendor); 

Vendor.get('/TVInfo/:id',tokenMiddleVerify , fetchTVVendor); 

Vendor.post('/TVVendorList',tokenMiddleVerify , listOfTVVendors); 

Vendor.delete('/deleteTV/:id',tokenMiddleVerify , deleteTVVendor); 



Vendor.post('/addRadioVendor',tokenMiddleVerify,Validation, addRadioVendor); 

Vendor.patch('/updateRadioVendor',tokenMiddleVerify ,Validation, updateRadioVendor); 

Vendor.get('/RadioVendorInfo/:id',tokenMiddleVerify , fetchRadioVendor); 

Vendor.post('/RadioVendorList',tokenMiddleVerify , listOfRadioVendors); 

Vendor.delete('/deleteRadioVendor/:id',tokenMiddleVerify , deleteRadioVendor); 





module.exports = Vendor;