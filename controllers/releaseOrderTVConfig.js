const TvRoFctModel = require('../models/releaseOrderTVFCT')
const TvRoSponsorshipModel = require('../models/releaseOrderTVSponsorship')
const { fileUpload } = require('../common/aws');
const { GenerateNewRoNumber } = require('../common/nommoc');

exports.addTvRoFCT = async (req, res) => {
    let data = req.body;

    const TagLineFile = req.files['attachedFile'] ? req.files['attachedFile'][0] : null;
    //  console.log(TagLineFile)
   
    let uploadedFile
    if (TagLineFile) {
        uploadedFile = await new Promise((resolve) => {
            fileUpload(TagLineFile, (uploadData) => {
                // console.log(uploadData)
                if (uploadData.status) {
                    resolve(uploadData.url);
                }
                // else {
                //     res.json({ "status": false, message: "Error occurred while uploading tagLineFile, please try again" });
                //     return;
                // }
            }).catch(e => console.error(e));
        });
    }

    data.attachedFile = uploadedFile;

    //console.log(data)
    data.roNumber = await GenerateNewRoNumber()

    TvRoFctModel.create(data)
        .then((latestTVRO) => {
            if (latestTVRO) {
                return res.json({ "status": true, "message": "TV Release Order added successfully." });
            } else {
                throw new Error("Oops! Something went wrong.");
            }
        })
        .catch((error) => {
            console.error(error);
            return res.json({ "status": false, "message": error.message || "Oops! Something went wrong. Please try again later" });
        });
};


exports.updateTVROFCTDetail = async (req, res) => {
    try {
        let data = req.body;

        const TagLineFile = req.files['attachedFile'] ? req.files['attachedFile'][0] : null;
        //  console.log(TagLineFile)
    
        let uploadedFile
        if (TagLineFile) {
            uploadedFile = await new Promise((resolve) => {
                fileUpload(TagLineFile, (uploadData) => {
                    // console.log(uploadData)
                    if (uploadData.status) {
                        resolve(uploadData.url);
                    }
                    // else {
                    //     res.json({ "status": false, message: "Error occurred while uploading tagLineFile, please try again" });
                    //     return;
                    // }
                }).catch(e => console.error(e));
            });
        }

        data.attachedFile = uploadedFile;

        TvRoFctModel.findById(data._id)
            .then((exTVRO) => {
                if (exTVRO) {
                    TvRoFctModel.findByIdAndUpdate(data._id, { $set: data }, { new: true })
                        .then((newTVRO) => {
                            if (newTVRO) {
                                return res.json({ "status": true, "message": "TVRO data updated successfully." });
                            } else {
                                throw new Error("TVRO does not exist.!!!");
                            }
                        }).catch((error) => {

                            return res.json({ "status": false, "message": error.message });
                        });
                } else {
                    throw new Error("TVRO does not exist.!!!");
                }
            }).catch((error) => {

                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

// exports.fetchTVRODetail = (req, res) => {
//     try {
//         let data = req.params;

//         TVRO.findById(data.id)
//             .populate({
//                 path: 'newsPaperName',
//                 model: 'NewsPaper',
//                 select: 'name'
//             })
//             .populate({
//                 path: 'newsPaperCenter',
//                 model: 'NewsPaperCenter',
//                 select: 'name'
//             })
//             .populate({
//                 path: 'typeClientNameHere',
//                 model: 'Client',
//                 select: 'clientName'
//             })
//             .populate({
//                 path: 'subAgent',
//                 model: 'subAgentSchema',
//                 select: 'name'
//             })
//             .populate({
//                 path: 'advtEditionType',
//                 model: 'adsEditionSchema',
//                 select: 'editionName'
//             })
//             .populate({
//                 path: 'advtType',
//                 model: 'advtTypeSchema',
//                 select: 'adsType'
//             })
//             .populate({
//                 path: 'editionsYouSelected',
//                 model: 'advtEditionSchema',
//                 select: 'editionName editionState'
//             })
//             .populate({
//                 path: 'advtIssueOrMalarOrOthers',
//                 model: 'issueSchema',
//                 select: 'issueTypeName'

//             })
//             .populate({
//                 path: 'malarType',
//                 model: 'issueSubCatSchema',
//                 select: 'issueId issueSubCat'

//             })
//             .populate({
//                 path: 'advtHue',
//                 model: 'hueSchema',
//                 select: 'hueData'
//             })
//             .populate({
//                 path: 'advtPosition',
//                 model: 'advtPositionSchema',
//                 select: 'advtPos'
//             })
//             .populate({
//                 path: 'scheme',
//                 model: 'schemaModel',
//                 select: 'schemaName'
//             })
//             .populate({
//                 path: 'specialDiscount.discountCategory',
//                 model: 'DiscountCategory',
//                 select: 'name'
//             })
//             .populate({
//                 path: 'specialDiscount.noticeType',
//                 model: 'NoticeType',
//                 select: 'name'
//             })
//             .populate({
//                 path: 'selectedGST',
//                 model: 'GST',
//                 select: 'percent'
//             })
//             .then((exTVRO) => {

//                 return res.json({ "status": true, "data": exTVRO });

//             }).catch((error) => {
//                 return res.json({ "status": false, "message": error.message });
//             });
//     } catch (e) {
//         console.error(e)
//         return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
//     }
// };
exports.fetchTVROFCTDetail = (req, res) => {
    try {
        let data = req.params;

        TvRoFctModel.findById(data.id)
            .then((exTVRO) => {

                return res.json({ "status": true, "data": exTVRO });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};


exports.fetchTvRoFCTGenerated = (req, res) => {
    try {
        let data = req.params;

        TvRoFctModel.findById(data.id)
        .select("roNumber isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId")
            .then((exTvRoFct) => {

                return res.json({ "status": true, "data": exTvRoFct });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};
exports.TVROFCTList = async (req, res) => {
    try {
        const { roNumberFrom, roNumberTo, channel,fromDate ,toDate, companyName, duration, agencyNameForBilling, advertiserNameForBilling } = req.body;

        //const query = { isReleased: true, isCancelled: false };
        const query = {};

        if (roNumberFrom && roNumberTo) {
            query.roNumber = {
                $gte: roNumberFrom,
                $lte: roNumberTo
            };
        }

        if (fromDate && toDate) {
            const dateTo = new Date(toDate);
            dateTo.setDate(dateTo.getDate() + 1);
           
            query.roDate = {
                $gte: new Date(fromDate),
                $lte: dateTo,
            };
        }

        if (companyName) {

            query.companyName = new RegExp(companyName, 'i')

        }
        if (channel) {

            query.channel = new RegExp(channel, 'i')

        }


        if (duration) {

            query.adDuration = duration
        }

        if (agencyNameForBilling) {

            query.agencyNameForBilling = new RegExp(agencyNameForBilling, 'i')

        }
        if (advertiserNameForBilling) {

            query.advertiserNameForBilling = new RegExp(advertiserNameForBilling, 'i')


        }


        //  console.log(query)

        const TVROs = await TvRoFctModel.find(query)
            // .populate({
            //     path: 'newsPaperName',
            //     model: 'NewsPaper',
            //     select: 'name'
            // })
            // .populate({
            //     path: 'typeClientNameHere',
            //     model: 'Client',
            //     select: 'clientName'
            // })
            // .populate({
            //     path: 'subAgent',
            //     model: 'subAgentSchema',
            //     select: 'name'
            // }).populate({
            //     path: 'editionsYouSelected',
            //     model: 'advtEditionSchema',
            //     select: 'editionName editionState'
            // })
            // .populate({
            //     path: 'advtIssueOrMalarOrOthers',
            //     model: 'issueSchema',
            //     select: 'issueTypeName'

            // })
            // .populate({
            //     path: 'malarType',
            //     model: 'issueSubCatSchema',
            //     select: 'issueId issueSubCat'

            // })
            // .populate({
            //     path: 'specialDiscount.discountCategory',
            //     model: 'DiscountCategory',
            //     select: 'name'
            // })
            // .populate({
            //     path: 'advtHue',
            //     model: 'hueSchema',
            //     select: 'hueData'
            // })
            // .populate({
            //     path: 'advtPosition',
            //     model: 'advtPositionSchema',
            //     select: 'advtPos'
            // })
            .select("roNumber media client companyName channel agencyNameForBilling advertiserNameForBilling adDuration totalWithGST remindStatus isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId roDate").sort({ "roNumber": -1 });

        return res.json({ status: true, data: TVROs });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};

exports.deleteTVROFCT = async (req, res) => {
    try {

        const { id } = req.params;


        const TVROs = await TvRoFctModel.findByIdAndDelete(id)
        if (TVROs) {

            return res.json({ status: true, message: "Deleted succesfully." });
        }
        return res.json({ status: false, message: "Unable to delete.!!!" });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};



// ==============================================   Sponsorship    ===============================================



exports.addTvRoSponsorship = async (req, res) => {
    let data = req.body;

    const TagLineFile = req.files['attachedFile'] ? req.files['attachedFile'][0] : null;
    //  console.log(TagLineFile)

    let uploadedFile
    if (TagLineFile) {
        uploadedFile = await new Promise((resolve) => {
            fileUpload(TagLineFile, (uploadData) => {
                // console.log(uploadData)
                if (uploadData.status) {
                    resolve(uploadData.url);
                }
                // else {
                //     res.json({ "status": false, message: "Error occurred while uploading tagLineFile, please try again" });
                //     return;
                // }
            }).catch(e => console.error(e));
        });
    }

    data.attachedFile = uploadedFile;

    //console.log(data)
    data.roNumber = await GenerateNewRoNumber()

    TvRoSponsorshipModel.create(data)
        .then((latestTVRO) => {
            if (latestTVRO) {
                return res.json({ "status": true, "message": "TV Release Order added successfully." });
            } else {
                throw new Error("Oops! Something went wrong.");
            }
        })
        .catch((error) => {
            console.error(error);
            return res.json({ "status": false, "message": error.message || "Oops! Something went wrong. Please try again later" });
        });
};


exports.updateTVROSponsorshipDetail = async (req, res) => {
    try {
        let data = req.body;

        const TagLineFile = req.files['attachedFile'] ? req.files['attachedFile'][0] : null;
        //  console.log(TagLineFile)
       
        let uploadedFile
        if (TagLineFile) {
            uploadedFile = await new Promise((resolve) => {
                fileUpload(TagLineFile, (uploadData) => {
                    // console.log(uploadData)
                    if (uploadData.status) {
                        resolve(uploadData.url);
                    }
                    // else {
                    //     res.json({ "status": false, message: "Error occurred while uploading tagLineFile, please try again" });
                    //     return;
                    // }
                }).catch(e => console.error(e));
            });
        }

        data.attachedFile = uploadedFile;

        TvRoSponsorshipModel.findById(data._id)
            .then((exTVRO) => {
                if (exTVRO) {
                    TvRoSponsorshipModel.findByIdAndUpdate(data._id, { $set: data }, { new: true })
                        .then((newTVRO) => {
                            if (newTVRO) {
                                return res.json({ "status": true, "message": "TVRO data updated successfully." });
                            } else {
                                throw new Error("TVRO does not exist.!!!");
                            }
                        }).catch((error) => {

                            return res.json({ "status": false, "message": error.message });
                        });
                } else {
                    throw new Error("TVRO does not exist.!!!");
                }
            }).catch((error) => {

                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.fetchTVROSponsorshipDetail = (req, res) => {
    try {
        let data = req.params;

        TvRoSponsorshipModel.findById(data.id)
            .then((exTVRO) => {

                return res.json({ "status": true, "data": exTVRO });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};


exports.fetchTvRoSponsorshipGenerated = (req, res) => {
    try {
        let data = req.params;

        TvRoSponsorshipModel.findById(data.id)
        .select("roNumber isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId")
            .then((exTvRoSponsorship) => {

                return res.json({ "status": true, "data": exTvRoSponsorship });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.TVROSponsorshipList = async (req, res) => {
    try {
        const { roNumberFrom, roNumberTo, channel,fromDate ,toDate, companyName, duration, agencyNameForBilling, advertiserNameForBilling } = req.body;

        //const query = { isReleased: true, isCancelled: false };
        const query = {};

        if (roNumberFrom && roNumberTo) {
            query.roNumber = {
                $gte: roNumberFrom,
                $lte: roNumberTo
            };
        }

        if (fromDate && toDate) {
            const dateTo = new Date(toDate);
            dateTo.setDate(dateTo.getDate() + 1);
           
            query.roDate = {
                $gte: new Date(fromDate),
                $lte: dateTo,
            };
        }

        if (companyName) {

            query.companyName = new RegExp(companyName, 'i')

        }
        if (channel) {

            query.channel = new RegExp(channel, 'i')

        }


        if (duration) {

            query.adDuration = duration
        }

        if (agencyNameForBilling) {

            query.agencyNameForBilling = new RegExp(agencyNameForBilling, 'i')

        }
        if (advertiserNameForBilling) {

            query.advertiserNameForBilling = new RegExp(advertiserNameForBilling, 'i')


        }

        const TVROs = await TvRoSponsorshipModel.find(query)
            // .populate({
            //     path: 'newsPaperName',
            //     model: 'NewsPaper',
            //     select: 'name'
            // })
            // .populate({
            //     path: 'typeClientNameHere',
            //     model: 'Client',
            //     select: 'clientName'
            // })
            // .populate({
            //     path: 'subAgent',
            //     model: 'subAgentSchema',
            //     select: 'name'
            // }).populate({
            //     path: 'editionsYouSelected',
            //     model: 'advtEditionSchema',
            //     select: 'editionName editionState'
            // })
            // .populate({
            //     path: 'advtIssueOrMalarOrOthers',
            //     model: 'issueSchema',
            //     select: 'issueTypeName'

            // })
            // .populate({
            //     path: 'malarType',
            //     model: 'issueSubCatSchema',
            //     select: 'issueId issueSubCat'

            // })
            // .populate({
            //     path: 'specialDiscount.discountCategory',
            //     model: 'DiscountCategory',
            //     select: 'name'
            // })
            // .populate({
            //     path: 'advtHue',
            //     model: 'hueSchema',
            //     select: 'hueData'
            // })
            // .populate({
            //     path: 'advtPosition',
            //     model: 'advtPositionSchema',
            //     select: 'advtPos'
            // })
            .select("roNumber media client companyName channel agencyNameForBilling advertiserNameForBilling adDuration totalWithGST remindStatus isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId roDate").sort({ "roNumber": -1 });

        return res.json({ status: true, data: TVROs });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};

exports.deleteTVROSponsorship = async (req, res) => {
    try {

        const { id } = req.params;


        const TVROs = await TvRoSponsorshipModel.findByIdAndDelete(id)
        if (TVROs) {

            return res.json({ status: true, message: "Deleted succesfully." });
        }
        return res.json({ status: false, message: "Unable to delete.!!!" });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};
