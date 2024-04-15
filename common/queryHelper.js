const mongoose = require('mongoose');
require("../models/bank");
require("../models/issueTyp");
require("../models/schema");
require("../models/category");
require("../models/busCategory");
require("../models/advtType");
require("../models/dataSource");
require("../models/hue");
require("../models/pageNo");
require("../models/department");
require("../models/designationName");
require("../models/subIssue")
require("../models/advtPostion")
require("../models/pressReporter")
require("../models/subHeading")
require("../models/edition")
require("../models/advtEdition")
require("../models/brand")
require("../models/distriBand")
require("../models/fmProgm")
require("../models/event")
require("../models/adsCategory")
require("../models/screen")
require("../models/screenAddProvider")
require("../models/adsEditionType")
require('../models/roNumber')
require('../models/theaterSchema')





exports.create = async(collection_name, values, callback) => {
    try {
        let collection;
        collection = mongoose.model(collection_name);
        let valuelen = Object.keys(values).length;
        if (valuelen > 0) {
            const resp = await collection.create(values);
            callback({ status: true, message: "Record Created Successfully" });
        } else {
            callback({status:false,message:"Request Is Empty"})
        }
    } catch (err) {
        console.log("Error catched in insertData", err);
        callback({status:false,message:"Error catched in insertData",error:err})

    }
}

exports.findoneData = (collection_name, where, callback) => {
    try {
        let collection;
        collection = mongoose.model(collection_name);
         collection.findOne(where)
            .then((res)=>{
                if(res){
                    callback({status:true,data:res})
                }else{
                    callback({status:false,message:"No data found"})
                }
            }).catch((err)=>{
                console.log(err,"err")
                callback({status:false,message:"Unable to fetch record",error:err})
            })
    } catch (err) {
        console.log("Error catched in findoneData", err);
        callback({status:false,message:"Error catched in findoneData",error:err})
    }
}

exports.isExist = async(collection_name, where) => {
    try {
        let collection;
        collection = mongoose.model(collection_name);
        const res = await collection.findOne(where)
        console.log(res,"res")
        return !!res
    } catch (err) {
        console.log("Error catched in findoneData", err);
        return true
    }
}

exports.findData = async(collection_name, where, sorts, limit, callback) => {
    try {
        let collection;
        collection = mongoose.model(collection_name);
        let sortlen = Object.keys(sorts).length;
        if (sortlen != 0 && limit != 0) {
                const resdata = await collection.find(where).sort(sorts).limit(limit)
                if (resdata) {
                    callback({status:true,message:"Available List",data:resdata});
                } else {
                    callback({status:false,message:"No Data Found",data:res});
                }
            
        } else if (sortlen != 0) {
            const resdata = await collection.find(where).sort(sorts)
                if (resdata) {
                    callback({status:true,message:"Available List",data:resdata});
                } else {
                    callback({status:false,message:"No Data Found",data:res});
                }
            
        } else if (limit != 0) {
            const resdata = await collection.find(where).limit(limit)
                if (resdata) {
                    callback({status:true,message:"Available List",data:resdata});
                } else {
                    callback({status:false,message:"No Data Found",data:res});
                }
           
        } else {
            const res = await collection.find(where)
            if (res) {
                callback({status:true,message:"Available List",data:res});
            } else {
                callback({status:false,message:"No Data Found",data:res});
            }
        }
    } catch (err) {
        console.log("Error catched in findData", err);
        callback(false);
    }
}

exports.updateData = async(collection_name, updatetype, where, values,callback) => {
    try {
        let collection;
        collection = mongoose.model(collection_name);
        console.log(values,"values")
        if (updatetype == "one") {
                const resdata = await collection.updateOne(where,{ "$set": values })
                if (resdata) {
                    callback({status:true,message:"Updated successfully"});
                } else {
                    callback({status:false,message:"Error occur while updating",error:resdata});
                }
        } else {
                const resdata = await collection.updateMany(where,{ "$set": values })
                if (resdata) {
                    callback({status:true,message:"Updated successfully"});
                } else {
                    callback({status:false,message:"Error occur while updating",error:resdata});
                }
            
        }
    } catch (err) {
        console.log("Error catched in updateData", err);
        callback(false);
    }
}

exports.deleteData = async(collection_name, deletetype, where, callback) => {
    try {
        let collection;
        collection = mongoose.model(collection_name);
        if (deletetype == "one") {
            const resdata = await collection.deleteOne(where)
                if (resdata) {
                    callback({status:true,message:"Deleted successfully"});
                } else {
                    callback({status:false,message:"Error occur while deleting",error:resdata});
                }
        } else {
            const resdata = await collection.deleteMany(where)
                if (resdata) {
                    callback({status:true,message:"Deleted successfully"});
                } else {
                    callback({status:false,message:"Error occur while deleting",error:resdata});
                }
        }
    } catch (err) {
        console.log("Error catched in deleteData", err);
        callback({status:false,message:"Error occur while deleting",error:resdata});
    }
}

exports.findByIdAndUpdate = async(collection_name, where, data,callback) => {
    try {
        let collection;
        collection = mongoose.model(collection_name);
            const res = await collection.findByIdAndUpdate(where,data,{new:true})
            if (res) {
                callback({status:true,message:"Updated Successfully"});
            } else {
                callback({status:false,message:"Failed to update"});
            }
        
    } catch (err) {
        console.log("Error catched in findData", err);
        callback({status:false,message:"Error catched in updating Record",err:err});
    }
}

