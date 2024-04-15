const express = require('express');
const agent = express.Router();
const agentController = require('../controllers/agentConfig');
const { Validation } = require('../common/theaterRoValidation');
const { tokenMiddleVerify } = require('../common/encDec');

agent.post('/crtSubAgent', agentController.crtSubAgent); 

agent.patch('/uptSubAgent', agentController.uptSubAgent); 

agent.get('/subAgentInfo/:id', agentController.subAgentInfo); 

agent.post('/subAgentList', agentController.subAgentList); 

agent.delete('/delSubAgentInfo/:id', agentController.delSubAgentInfo); 

module.exports = agent;