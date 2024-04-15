const express = require('express')
const theaterRoute = express.Router();
const controller = require("../controllers/theaterConfig")
const nodeValidator = require('../common/theaterRoValidation');
const common = require("../common/encDec")

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024 } });

theaterRoute.post("/crtThrOnScrnRo",common.tokenMiddleVerify,nodeValidator.postValidation,controller.crtThrOnScrnRo)

theaterRoute.patch("/editThrOnScrRo/:id",common.tokenMiddleVerify,controller.editThrOnScrRo)

theaterRoute.get("/listThrOnScrRo",common.tokenMiddleVerify,controller.listThrOnScrRo)

theaterRoute.get('/isThrOnScrRoGenerated/:id',common.tokenMiddleVerify , controller.fetchonScrnTheaterROGenerated); 

theaterRoute.delete("/delThrOnScrRo/:id",common.tokenMiddleVerify,controller.delThrOnScrRo)

theaterRoute.post("/crtThrOffScrnRo",common.tokenMiddleVerify,nodeValidator.postValidation,controller.crtThrOffScrnRo)

theaterRoute.patch("/editThrOffScrRo/:id",common.tokenMiddleVerify,controller.editThrOffScrRo)

theaterRoute.get("/listThrOffScrRo",common.tokenMiddleVerify,controller.listThrOffScrRo)

theaterRoute.get('/isThrOffScrRoGenerated/:id',common.tokenMiddleVerify , controller.fetchoffScrnTheaterROGenerated); 

theaterRoute.delete("/delThrOffScrRo/:id",common.tokenMiddleVerify,controller.delThrOffScrRo)

theaterRoute.post("/s3Upload",upload.single('file'),controller.s3Upload)






module.exports = theaterRoute