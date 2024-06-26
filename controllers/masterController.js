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

exports.crtFMProgram = async(req, res) => {
    try {
        const obj = {prgName:req.body.programName,startTime:req.body.fromTime,endTime:req.body.toTime}
        const isExist = await queryHelper.isExist("fmProgramSchema",obj)
        if(!isExist){
        queryHelper.create("fmProgramSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Record already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstFMProgram = (req, res) => {
    try {
        queryHelper.findData('fmProgramSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        programName:item.prgName,
                        fromTime:item.startTime,
                        toTime:item.endTime,
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

exports.updFMProgram = (req, res) => {
    try {
        const data = req.body
        queryHelper.findByIdAndUpdate("fmProgramSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })
    }  catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delFMProgram = (req, res) => {
    try {
        queryHelper.deleteData("fmProgramSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.crtDisBand = async(req, res) => {
    try {
        const obj = {distriName:req.body.distributionName}
        const data ={
            distriName:req.body.distributionName,
            clientId:req.body.clientUniId,
            programId:req.body.programUniId,

        }
        const isExist = await queryHelper.isExist("distriBandSchema",obj)
        if(!isExist){
        queryHelper.create("distriBandSchema",data,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Distribution Name already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstDisBand = (req, res) => {
    try {
        queryHelper.findData('distriBandSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        distributionName:item.distriName,
                        clientUniId:item.clientId,
                        programUniId:item.programId,
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

exports.updDisBand = (req, res) => {
    try {
        const data = req.body
        queryHelper.findByIdAndUpdate("distriBandSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delDisBand = (req, res) => {
    try {
        queryHelper.deleteData("distriBandSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.crtBrand = async(req, res) => {
    try {
        const obj = {brndName:req.body.brandName,clientId:req.body.clientUniId}
        const isExist = await queryHelper.isExist("s2BrandSchema",obj)
        if(!isExist){
        queryHelper.create("s2BrandSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Brand Name already exist"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstBrand = (req, res) => {
    try {

        queryHelper.findData('s2BrandSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        brandName:item.brndName,
                        clientUniId:item.clientId,
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

exports.updBrand = (req, res) => {
    try {
        const data = req.body 
        queryHelper.findByIdAndUpdate("s2BrandSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delBrand = (req, res) => {
    try {
        queryHelper.deleteData("s2BrandSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.crts2Events = async(req, res) => {
    try {
        const obj = {evntName:req.body.eventName,clientId:req.body.clientUniId}
        const isExist = await queryHelper.isExist("s2EventSchema",obj)
        if(!isExist){
        queryHelper.create("s2EventSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"s2 Event Name already exist"})
        }

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lsts2Events = (req, res) => {
    try {
        queryHelper.findData('s2EventSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        eventName:item.evntName,
                        clientUniId:item.clientId,
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

exports.upds2Events = (req, res) => {
    try {
        const data = req.body 
        queryHelper.findByIdAndUpdate("s2EventSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.dels2Events = (req, res) => {
    try {
        queryHelper.deleteData("s2EventSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.crtAdsCategory = async(req, res) => {
    try {
        const obj = {catName:req.body.categoryName}
        const isExist = await queryHelper.isExist("adsCatSchema",obj)
        if(!isExist){
        queryHelper.create("adsCatSchema",obj,(resp)=>{
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


exports.lstAdsCategory = (req, res) => {
    try {
        queryHelper.findData('adsCatSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        categoryName:item.catName,
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

exports.updBusAdsCategory = (req, res) => {
    try {
        const data ={ catName:req.body.categoryName }
        queryHelper.findByIdAndUpdate("adsCatSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delBusAdsCategory = (req, res) => {
    try {
        queryHelper.deleteData("adsCatSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.crtAdvtEdition = async(req, res) => {
    try {
        const obj = {editionName:req.body.advtEditionName}
        const data ={
            adsProviderId:req.body.advtProId,
            editionTypeId:req.body.editionId,
            editionName:req.body.advtEditionName,
            editionState:req.body.advtEditionState,
            editionCity:req.body.advtEditionCity,
            frequency:req.body.frequency,
            mediaDisc:req.body.mediaDisc,
            mediaRate:req.body.mediaRate
        }
        const isExist = await queryHelper.isExist("advtEditionSchema",obj)
        if(!isExist){
        queryHelper.create("advtEditionSchema",data,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Edition Name already available"})
        }
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstAdvtEdition = (req, res) => {
    try {
        queryHelper.findData('advtEditionSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        advtProId:item.adsProviderId,
                        editionId:item.editionTypeId,
                        advtEditionName:item.editionName,
                        advtEditionState:item.editionState,
                        advtEditionCity:item.editionCity,
                        frequency:item.frequency,
                        mediaDisc:item.mediaDisc,
                        mediaRate:item.mediaRate,
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

exports.updAdvtEdition = (req, res) => {
    try {
        const data = req.body
        queryHelper.findByIdAndUpdate("advtEditionSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delAdvtEdition = (req, res) => {
    try {
        queryHelper.deleteData("advtEditionSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.crtAdvtEditionType = async(req, res) => {
    try {
        const obj = {editionName:req.body.advtEditionName,catId:req.body.categoryId}       
        const isExist = await queryHelper.isExist("adsEditionSchema",obj)
        if(!isExist){
        queryHelper.create("adsEditionSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Edition Name already available"})
        }

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstAdvtEditionType = (req, res) => {
    try {

         
        queryHelper.findData('adsEditionSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        categoryId:item.catId,
                        advtEditionName:item.editionName,
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

exports.updAdvtEditionType = (req, res) => {
    try {
        const data = req.body
        queryHelper.findByIdAndUpdate("adsEditionSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delAdvtEditionType = (req, res) => {
    try {
        queryHelper.deleteData("adsEditionSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}




exports.crtscreen = async(req, res) => {
    try {
        const obj = {screen:req.body.screenName}       
        const isExist = await queryHelper.isExist("screenSchema",obj)
        if(!isExist){
        queryHelper.create("screenSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Edition Name already available"})
        }

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.lstscreen = (req, res) => {
    try {
        queryHelper.findData('screenSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        screenName:item.screen,
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

exports.updscreen = (req, res) => {
    try {
        const data = {screen:req.body.screenName}
        queryHelper.findByIdAndUpdate("screenSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delscreen = (req, res) => {
    try {
        queryHelper.deleteData("screenSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.crtScreenAdsprov = async(req, res) => {
    try {
        const obj = {usrName:req.body.userName,scrnId:req.body.screenId,disName:req.body.districtName}       
        const isExist = await queryHelper.isExist("screenAddProvSchema",obj)
        if(!isExist){
        queryHelper.create("screenAddProvSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Record  already available"})
        }

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.lstScreenAdsprov = (req, res) => {
    try {

        screenAddProv.aggregate([
            {$lookup:{ 
             from: config.dbPrefix + 'AMEHCSNEERCS',
             let: { scrnId: { $toObjectId: "$scrnId" } },
             pipeline: [ { $match: { $expr: { $eq: ["$_id", "$$scrnId"] }}}],
             as: "screenData"
            }},
            {
                $project:{
                    _id:1,
                    screenName: { $arrayElemAt: ["$screenData.screen", 0] } ,
                    districtName:'$disName',
                    userName:'$usrName',
                    createdAt:'$createdAt',
                    screenId: '$scrnId'
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

        // queryHelper.findData('screenAddProvSchema', {}, {}, 0, (resp) => {
        //     if(resp.status){
        //         const updatedValue = resp.data.map((item,i)=>{
        //             return{
        //                 id:item._id,
        //                 screenId:item.scrnId,
        //                 createdAt:item.createdAt,
        //                 districtName:item.disName,
        //                 userName:item.usrName

                      
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

exports.updScreenAdsprov = (req, res) => {
    try {
        const data =req.body
        queryHelper.findByIdAndUpdate("screenAddProvSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })


    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.delScreenAdsprov = (req, res) => {
    try {
        queryHelper.deleteData("screenAddProvSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.crttheater = async(req, res) => {
    try {
        const obj = {theaterName:req.body.theaterName,addrLine1:req.body.addrLine1,dist:req.body.dist,state:req.body.state}       
        const isExist = await queryHelper.isExist("theaterSchema",obj)
        if(!isExist){
        queryHelper.create("theaterSchema",obj,(resp)=>{
            res.json(resp)
        })
        }else{
            res.json({status:false,message:"Record  already available"})
        }

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.lsttheater = (req, res) => {
    try {
        queryHelper.findData('theaterSchema', {}, {}, 0, (resp) => {
            if(resp.status){
                const updatedValue = resp.data.map((item,i)=>{
                    return{
                        id:item._id,
                        theaterName:item.theaterName,
                        addrLine1:item.addrLine1,
                        dist:item.dist,
                        state:item.state,
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

exports.updtheater = (req, res) => {
    try {
        const data =req.body
        queryHelper.findByIdAndUpdate("theaterSchema",{_id:new mongoose.Types.ObjectId(req.body.id)},data,(resp)=>{
            res.json(resp)
        })


    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.deltheater = (req, res) => {
    try {
        queryHelper.deleteData("theaterSchema","one",{_id:new mongoose.Types.ObjectId(req.params.id)},(data) => {
            res.json(data)
        })

    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

// const updateData = {};

// // Mapping between request keys and MongoDB keys
// const keyMapping = {
//   brandName: 'brndName',
//   clientUniId: 'clientId',
//   // Add more mappings as needed
// };

// // Iterate through the keys in req.body, map them, and add to updateData
// for (const reqKey in req.body) {
//   if (req.body.hasOwnProperty(reqKey) && req.body[reqKey]) {
//     const mongoKey = keyMapping[reqKey];
//     if (mongoKey) {
//       updateData[mongoKey] = req.body[reqKey];
//     }
//   }
// }