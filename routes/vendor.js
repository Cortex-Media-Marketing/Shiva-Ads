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





Vendor.post('/addOOHVendor',tokenMiddleVerify,Validation, addOOHVendor); 

Vendor.patch('/updateOOHVendor',tokenMiddleVerify ,Validation, updateOOHVendor); 

Vendor.get('/OOHVendorInfo/:id',tokenMiddleVerify , fetchOOHVendor); 

Vendor.post('/OOHVendorList',tokenMiddleVerify , listOfOOHVendors); 

Vendor.delete('/deleteOOHVendor/:id',tokenMiddleVerify , deleteOOHVendor); 



Vendor.post('/addYouTubeVendor',tokenMiddleVerify,Validation, addYouTubeVendor); 

Vendor.patch('/updateYouTubeVendor',tokenMiddleVerify ,Validation, updateYouTubeVendor); 

Vendor.get('/YouTubeVendorInfo/:id',tokenMiddleVerify , fetchYouTubeVendor); 

Vendor.post('/YouTubeVendorList',tokenMiddleVerify , listOfYouTubeVendors); 

Vendor.delete('/deleteYouTubeVendor/:id',tokenMiddleVerify , deleteYouTubeVendor); 


Vendor.post('/addTheatreVendor',tokenMiddleVerify,Validation, addTheatreVendor); 

Vendor.patch('/updateTheatreVendor',tokenMiddleVerify ,Validation, updateTheatreVendor); 

Vendor.get('/TheatreVendorInfo/:id',tokenMiddleVerify , fetchTheatreVendor); 

Vendor.post('/TheatreVendorList',tokenMiddleVerify , listOfTheatreVendors); 

Vendor.delete('/deleteTheatreVendor/:id',tokenMiddleVerify , deleteTheatreVendor); 


Vendor.post('/addOtherVendor',tokenMiddleVerify,Validation, addOtherVendor); 

Vendor.patch('/updateOtherVendor',tokenMiddleVerify ,Validation, updateOtherVendor); 

Vendor.get('/OtherVendorInfo/:id',tokenMiddleVerify , fetchOtherVendor); 

Vendor.post('/OtherVendorList',tokenMiddleVerify , listOfOtherVendors); 

Vendor.delete('/deleteOtherVendor/:id',tokenMiddleVerify , deleteOtherVendor); 


module.exports = Vendor;