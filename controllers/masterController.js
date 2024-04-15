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

exports.crtDataSource = async(req, res) => {
    try {
        const obj = {dataSrc:req.body.dataSource}
        const isExist = await queryHelper.isExist("dataSourceSchema",obj)
        if(!isExist){
        queryHelper.create("dataSourceSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"data Source already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstDataSource = (req, res) => {
    try {
        queryHelper.findData('dataSourceSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        dataSource:item.dataSrc,
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

exports.updDataSource = (req, res) => {
    try {
        const data = {datasrc:req.body.dataSource}
        queryHelper.findByIdAndUpdate("dataSourceSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delDataSource = (req, res) => {
    try {
        queryHelper.deleteData("dataSourceSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}



exports.crtHue = async(req, res) => {
    try {
        const obj = {hueData:req.body.hueValue}
        const isExist = await queryHelper.isExist("hueSchema",obj)
        if(!isExist){
        queryHelper.create("hueSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Hue Value already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstHue = (req, res) => {
    try {
        queryHelper.findData('hueSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        hueValue:item.hueData,
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

exports.updHue = (req, res) => {
    try {
        const data = {hueData:req.body.hueValue}
        queryHelper.findByIdAndUpdate("hueSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })
    }  catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delHue = (req, res) => {
    try {
        queryHelper.deleteData("hueSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.crtPage = async(req, res) => {
    try {
        const obj = {pageData:req.body.pageNo,issueId:req.body.adsIssueId}
        const isExist = await queryHelper.isExist("pageNoSchema",{pageData:req.body.pageNo})
        if(!isExist){
        queryHelper.create("pageNoSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"pageNo already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstPage = (req, res) => {
    try {
        pageNo.aggregate([
            {$lookup:{ 
             from: config.dbPrefix + 'AMEHCSEUSSI',
             let: { issueId: { $toObjectId: "$issueId" } },
             pipeline: [ { $match: { $expr: { $eq: ["$_id", "$$issueId"] }}}],
             as: "issueList"
            }},
            {
                $project:{
                    _id:1,
                    issueName: { $arrayElemAt: ["$issueList.issueTypeName", 0] } ,
                    pageNo:'$pageData',
                    adsIssueId:'$issueId',
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

        // queryHelper.findData('pageNoSchema', {}, {}, 0, (resp) => {
        //     if(resp.status){
        //         const updatedValue = resp.data.map((item,i)=>{
        //             return{
        //                 id:item._id,
        //                 pageNo:item.pageData,
        //                 adsIssueId:item.issueId,
        //                 createdAt:item.createdAt
        //             }
        //         })
        //         res.json({status:true,message:"Available List",data:updatedValue})
        //     }else{
        //         res.json(resp)
        //     }
           
        // })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.updPage = (req, res) => {
    try {
        const data = req.body
        queryHelper.findByIdAndUpdate("pageNoSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delPage = (req, res) => {
    try {
        queryHelper.deleteData("pageNoSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.crtDepartment = async(req, res) => {
    try {
        const obj = {departmentName:req.body.depName}
        const isExist = await queryHelper.isExist("depNameSchema",{departmentName:req.body.depName})
        if(!isExist){
        queryHelper.create("depNameSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Department Name already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstDepartment = (req, res) => {
    try {
        queryHelper.findData('depNameSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        depName:item.departmentName,
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

exports.updDepartment = (req, res) => {
    try {
        const data = {departmentName:req.body.depName}
        queryHelper.findByIdAndUpdate("depNameSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delDepartment = (req, res) => {
    try {
        queryHelper.deleteData("depNameSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.crtDesignation = async(req, res) => {
    try {
        const obj = {desName:req.body.designationName,depId:req.body.departmentId}
        const isExist = await queryHelper.isExist("designationSchema",{desName:req.body.designationName})
        if(!isExist){
        queryHelper.create("designationSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Designation Name already exist"})
        }

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstDesignation = (req, res) => {
    try {

        designation.aggregate([
            {$lookup:{ 
             from: config.dbPrefix + 'AMEHCSEMANPED',
             let: { depId: { $toObjectId: "$depId" } },
             pipeline: [ { $match: { $expr: { $eq: ["$_id", "$$depId"] }}}],
             as: "depName"
            }},
            {
                $project:{
                    _id:1,
                    depName: { $arrayElemAt: ["$depName.departmentName", 0] } ,
                    designationName:'$desName',
                    departmentId:'$depId',
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

        // queryHelper.findData('designationSchema', {}, {}, 0, (resp) => {
        //     if(resp.status){
        //         const updatedValue = resp.data.map((item,i)=>{
        //             return{
        //                 id:item._id,
        //                 designationName:item.desName,
        //                 departmentId:item.depId,
        //                 createdAt:item.createdAt
        //             }
        //         })
        //         res.json({status:true,message:"Available List",data:updatedValue})
        //     }else{
        //         res.json(resp)
        //     }
           
        // })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.updDesignation = (req, res) => {
    try {
        const data = req.body
        queryHelper.findByIdAndUpdate("designationSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delDesignation = (req, res) => {
    try {
        queryHelper.deleteData("designationSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.crtSubIssueType = async(req, res) => {
    try {
        const obj = {issueSubCat:req.body.issueCatName,issueId:req.body.isuId}
        const isExist = await queryHelper.isExist("issueSubCatSchema",{issueSubCat:req.body.issueCatName})
        if(!isExist){
        queryHelper.create("issueSubCatSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"issue SubCategory  already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstSubIssueType = (req, res) => {
    try {

        issueSubCat.aggregate([
            {$lookup:{ 
             from: config.dbPrefix + 'AMEHCSEUSSI',
             let: { issueId: { $toObjectId: "$issueId" } },
             pipeline: [ { $match: { $expr: { $eq: ["$_id", "$$issueId"] }}}],
             as: "issueDetail"
            }},
            {
                $project:{
                    _id:1,
                    issueType: { $arrayElemAt: ["$issueDetail.issueTypeName", 0] } ,
                    issueCatName:'$issueSubCat',
                    isuId:'$issueId',
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


        // queryHelper.findData('issueSubCatSchema', {}, {}, 0, (resp) => {
        //     if(resp.status){
        //         const updatedValue = resp.data.map((item,i)=>{
        //             return{
        //                 id:item._id,
        //                 issueCatName:item.issueSubCat,
        //                 isuId:item.issueId,
        //                 createdAt:item.createdAt
        //             }
        //         })
        //         res.json({status:true,message:"Available List",data:updatedValue})
        //     }else{
        //         res.json(resp)
        //     }
           
        // })


    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.updSubIssueType = (req, res) => {
    try {
        const data = req.body
        queryHelper.findByIdAndUpdate("issueSubCatSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delSubIssueType = (req, res) => {
    try {
        queryHelper.deleteData("issueSubCatSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}




exports.crtAdvtPosition = async(req, res) => {
    try {
        const obj = {advtPos:req.body.positionValue}
        const isExist = await queryHelper.isExist("advtPositionSchema",obj)
        if(!isExist){
        queryHelper.create("advtPositionSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"positionValue already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstAdvtPosition = (req, res) => {
    try {
        queryHelper.findData('advtPositionSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        positionValue:item.advtPos,
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

exports.updAdvtPosition = (req, res) => {
    try {
        const data = {advtPos:req.body.positionValue}
        queryHelper.findByIdAndUpdate("advtPositionSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })
    }  catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delAdvtPosition = (req, res) => {
    try {
        queryHelper.deleteData("advtPositionSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.crtPressReport = async(req, res) => {
    try {
        const obj = {reporterName:req.body.pressRepName,addProviderId:req.body.providerId}
        const isExist = await queryHelper.isExist("pressReporterSchema",obj)
        if(!isExist){
        queryHelper.create("pressReporterSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"This Record already available"})
        }

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstPressReport = (req, res) => {
    try {
        queryHelper.findData('pressReporterSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        pressRepName:item.reporterName,
                        providerId:item.addProviderId,
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

exports.updPressReport = (req, res) => {
    try {
        const data = req.body
        queryHelper.findByIdAndUpdate("pressReporterSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delPressReport = (req, res) => {
    try {
        queryHelper.deleteData("pressReporterSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}




exports.crtSubHeading = async(req, res) => {
    try {
        const obj = {headingName:req.body.subHeadName}
        const isExist = await queryHelper.isExist("subHeadingSchema",obj)
        if(!isExist){
        queryHelper.create("subHeadingSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Heading Name already available"})
        }

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.lstSubHeading = (req, res) => {
    try {
        queryHelper.findData('subHeadingSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        subHeadName:item.headingName,
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

exports.updSubHeading = (req, res) => {
    try {
        const data = {headingName:req.body.subHeadName}
        queryHelper.findByIdAndUpdate("subHeadingSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delSubHeading = (req, res) => {
    try {
        queryHelper.deleteData("subHeadingSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.crtEditionTyp = async(req, res) => {
    try {
        const obj = {editionType:req.body.typeOfEdition}
        const isExist = await queryHelper.isExist("editionSchema",obj)
        if(!isExist){
        queryHelper.create("editionSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Edition Type already available"})
        }

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.lstEditionTyp = (req, res) => {
    try {
        queryHelper.findData('editionSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        typeOfEdition:item.editionType,
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

exports.updEditionTyp = (req, res) => {
    try {
        const data = {editionType:req.body.typeOfEdition}
        queryHelper.findByIdAndUpdate("editionSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delEditionTyp = (req, res) => {
    try {
        queryHelper.deleteData("editionSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}
