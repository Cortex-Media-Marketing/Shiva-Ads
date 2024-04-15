const queryHelper = require("../common/queryHelper")
const mongoose = require('mongoose');
const config = require("../nodedetails/config");
const busCategory = mongoose.model("busCategorySchema")
const pageNo = mongoose.model("pageNoSchema")
const designation = mongoose.model("designationSchema")
const issueSubCat = mongoose.model("issueSubCatSchema")
const screenAddProv = mongoose.model("screenAddProvSchema")


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


exports.crtIssueType = async(req, res) => {
    try {
        const obj = {issueTypeName:req.body.isuName}
        const isExist = await queryHelper.isExist("issueSchema",obj)
        if(!isExist){
        queryHelper.create("issueSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Issue Type already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstIssueType = (req, res) => {
    try {
        queryHelper.findData('issueSchema', {}, {}, 0, async(resp) => {
            if(resp.status){
                const updatedValue = await resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        isuName:item.issueTypeName,
                        createdAt:item.createdAt
                    }
                })
                res.json({status:true,message:"Available List",data:updatedValue})
            }else{
                res.json(resp)
            }
           
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.updIssueType = (req, res) => {
    try {
        queryHelper.updateData("issueSchema","one",{_id:new mongoose.Types.ObjectId(req.body.id)},{"issueTypeName":req.body.isuName},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delIssueType = (req, res) => {
    try {
        queryHelper.deleteData("issueSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.crtSchema = async(req, res) => {
    try {
        const obj = {schemaName:req.body.schmName}
        const isExist = await queryHelper.isExist("schemaModel",obj)
        if(!isExist){
        queryHelper.create("schemaModel",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Schema already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.lstSchema = (req, res) => {
    try {
        queryHelper.findData('schemaModel', {}, {}, 0, async(resp) => {
            if(resp.status){
                const updatedValue = await resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        schmName:item.schemaName,
                        createdAt:item.createdAt
                    }
                })
                res.json({status:true,message:"Available List",data:updatedValue})
            }else{
                res.json(resp)
            }
           
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.updSchema = (req, res) => {
    try {
        queryHelper.updateData("schemaModel","one",{_id:new mongoose.Types.ObjectId(req.body.id)},{"schemaName":req.body.schmName},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delSchema = (req, res) => {
    try {
        queryHelper.deleteData("schemaModel","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.crtCategory = async(req, res) => {
    try {
        const obj = {categoryName:req.body.catName}
        const isExist = await queryHelper.isExist("categorySchema",obj)
        if(!isExist){
        queryHelper.create("categorySchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"category Name already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.lstCategory = (req, res) => {
    try {
        queryHelper.findData('categorySchema', {}, {}, 0, async(resp) => {
            if(resp.status){
                const updatedValue = await resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        catName:item.categoryName,
                        createdAt:item.createdAt
                    }
                })
                res.json({status:true,message:"Available List",data:updatedValue})
            }else{
                res.json(resp)
            }
           
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.updCategory = (req, res) => {
    try {
        queryHelper.updateData("categorySchema","one",{_id:new mongoose.Types.ObjectId(req.body.id)},{"categoryName":req.body.catName},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delCategory = async(req, res) => {
    try {
        const obj = {categoryId:req.params.id}
        console.log(obj,"obj")
        const isExist = await queryHelper.isExist("busCategorySchema",obj)
        console.log(isExist,"isExist")
        if(!isExist){
            res.json({status:false,message:"Category is assigned to business"})
        }else{
            queryHelper.deleteData("categorySchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
                res.json(data)
            })
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.crtBusCategory = async(req, res) => {
    try {

        const obj = {businessCatName:req.body.busCatName,categoryId:req.body.catId}
        const isExist = await queryHelper.isExist("busCategorySchema",{businessCatName:req.body.busCatName,categoryId:req.body.catId})
        if(!isExist){
        queryHelper.create("busCategorySchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Business Category Name already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.lstBusCategory = (req, res) => {
    try {
        // queryHelper.findData('busCategorySchema', {}, {}, 0, async(resp) => {
        //     if(resp.status){
                // const updatedValue = await resp.data.map((item,i)=>{
                //     return{
                //         id:item._id,
                //         busCatName:item.businessCatName,
                //         catId:item.categoryId,
                //         createdAt:item.createdAt
                //     }
                // })
            // }else{
            //     res.json(resp)
            // }
        // })
        busCategory.aggregate([
            {$lookup:{ 
             from: config.dbPrefix + 'AMEHCSYROGETAC',
             let: { categoryId: { $toObjectId: "$categoryId" } },
             pipeline: [ { $match: { $expr: { $eq: ["$_id", "$$categoryId"] }}}],
             as: "categoryList"
            }},
            {
                $project:{
                    _id:1,
                    categoryName: { $arrayElemAt: ["$categoryList.categoryName", 0] } ,
                    busCatName:'$businessCatName',
                    catId:'$categoryId',
                    createdAt:'$createdAt'
                }
            }

        ]).then((resp)=>{
            if(resp.length>0){
                res.json({status:true,message:"Available List",data:resp})
            }else{
                 res.json({status:false,message:"No Data Available"})
            }
        }).catch((err) => {
            console.error("Error during aggregation:", err);
            res.json({status:false,message:"Error while fetching"})
        });
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.updBusCategory = (req, res) => {
    try {
        const data = req.body
        queryHelper.findByIdAndUpdate("busCategorySchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
        res.json(resp)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delBusCategory = (req, res) => {
    try {
        queryHelper.deleteData("busCategorySchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.crtAdvtType = async(req, res) => {
    try {
        const obj = {adsType:req.body.advertisementType}
        const isExist = await queryHelper.isExist("advtTypeSchema",obj)
        if(!isExist){
        queryHelper.create("advtTypeSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Advertisement type already exist"})
        }

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstAdvtType = (req, res) => {
    try {
        queryHelper.findData('advtTypeSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        advertisementType:item.adsType,
                        createdAt:item.createdAt
                    }
                })
                res.json({status:true,message:"Available List",data:updatedValue})
            }else{
                res.json(resp)
            }
           
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.updAdvtType = (req, res) => {
    try {
        const data = {adsType:req.body.advertisementType}
        queryHelper.findByIdAndUpdate("advtTypeSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })
    }catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delAdvtType = (req, res) => {
    try {
        queryHelper.deleteData("advtTypeSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}
