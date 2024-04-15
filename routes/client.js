const express = require('express');
const client = express.Router();
const { addAClient, updateClientDetail, fetchClientDetail, fetchClientList, deleteClient } = require("../controllers/clientConfig");
const { Validation } = require('../common/validation');
const { tokenMiddleVerify } = require('../common/encDec');

client.post('/add_a_client',tokenMiddleVerify,Validation, addAClient); 

client.post('/add_instant_client',tokenMiddleVerify,Validation, addAClient); 

client.patch('/update_client_detail',tokenMiddleVerify ,Validation, updateClientDetail); 

client.get('/client_info/:clientId',tokenMiddleVerify , fetchClientDetail); 

client.post('/client_list',tokenMiddleVerify , fetchClientList); 

client.delete('/delete_client/:clientId',tokenMiddleVerify , deleteClient); 

module.exports = client;