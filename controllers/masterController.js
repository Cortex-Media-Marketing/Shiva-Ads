const queryHelper = require("../common/queryHelper")
const mongoose = require('mongoose');


exports.crtBank = async(req, res) => {
    try {
        const obj = {bankName:req.body.bName}
        const isExist = await queryHelper.isExist("bankModel",obj)
        if(!isExist){
        queryHelper.create("bankModel",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Bank Name already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later",error:e })
    }
}

exports.lstBank = (req, res) => {
    try {
        queryHelper.findData('bankModel', {}, {}, 0, async(resp) => {
            if(resp.status){
                const updatedValue = await resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        bName:item.bankName,
                        createdAt:item.createdAt
                    }
                })
                res.json({status:true,message:"Available List123",data:updatedValue})
            }else{
                res.json(resp)
            }
           
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.updBank = (req, res) => {
    try {
        queryHelper.updateData("bankModel","one",{_id:new mongoose.Types.ObjectId(req.body.id)},{"bankName":req.body.bName},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delBank = (req, res) => {
    try {
        queryHelper.deleteData("bankModel","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

