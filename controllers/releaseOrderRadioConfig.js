const RadioFCT = require('../models/releaseOrderRadioFCT')
const RadioNTR = require('../models/releaseOrderRadioNTR')
const RadioNFCT = require('../models/releaseOrderRadioNFCT')
const RadioRjMention = require('../models/releaseOrderRadioRjMention')
const { fileUpload } = require('../common/aws');
const { GenerateNewRoNumber } = require('../common/nommoc');

//////////////////////////////////////////////////   FCT ///////////////////////////////////////////////////////////////

exports.addRadioFCT = async (req, res) => {
    let data = req.body;

    const TagLineFile = req.files['attachmentFile'] ? req.files['attachmentFile'][0] : null;
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

    data.attachmentFile = uploadedFile;

    //console.log(data)
    data.roNumber = await GenerateNewRoNumber()

    if (data && data.coSponsor == 'false') {

        data.csProgramDate = null
        data.csSelectedPrograms = []
    }
    if (data && data.namingRights == 'false') {

        data.nrProgramDate = null
        data.nrSelectedPrograms = null
    }
    if (data && data.dayBranding == 'false') {

        data.dbProgramDate = null

    }
    if (data && data.assocDayBranding == 'false') {

        data.adbProgramDate = null

    }



    RadioFCT.create(data)
        .then((latestRadioFCT) => {
            if (latestRadioFCT) {
                return res.json({ "status": true, "message": "Added successfully." });
            } else {
                throw new Error("Oops! Something went wrong.");
            }
        })
        .catch((error) => {
            console.error(error);
            return res.json({ "status": false, "message": error.message || "Oops! Something went wrong. Please try again later" });
        });
};


exports.updateRadioFCTDetail = async (req, res) => {
    try {
        let data = req.body;

        const TagLineFile = req.files['attachmentFile'] ? req.files['attachmentFile'][0] : null;

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

        data.attachmentFile = uploadedFile;

        if (data && data.coSponsor == 'false') {

            data.csProgramDate = null
            data.csSelectedPrograms = []
        }
        if (data && data.namingRights == 'false') {

            data.nrProgramDate = null
            data.nrSelectedPrograms = null
        }
        if (data && data.dayBranding == 'false') {

            data.dbProgramDate = null

        }
        if (data && data.assocDayBranding == 'false') {

            data.adbProgramDate = null

        }



        RadioFCT.findById(data._id)
            .then((exRadioFCT) => {
                if (exRadioFCT) {
                    RadioFCT.findByIdAndUpdate(data._id, { $set: data }, { new: true })
                        .then((newRadioFCT) => {
                            if (newRadioFCT) {
                                return res.json({ "status": true, "message": "Updated successfully." });
                            } else {
                                throw new Error("Does not exist.!!!");
                            }
                        }).catch((error) => {

                            return res.json({ "status": false, "message": error.message });
                        });
                } else {
                    throw new Error("Does not exist.!!!");
                }
            }).catch((error) => {

                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.fetchRadioFCTDetail = (req, res) => {
    try {
        let data = req.params;

        RadioFCT.findById(data.id)
            .then((exRadioFCT) => {

                return res.json({ "status": true, "data": exRadioFCT });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.fetchRadioFCTGenerated = (req, res) => {
    try {
        let data = req.params;

        RadioFCT.findById(data.id)
        .select("roNumber isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId")
            .then((exRadioFCT) => {

                return res.json({ "status": true, "data": exRadioFCT });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.RadioFCTList = async (req, res) => {
    try {
        const { roNumberFrom, roNumberTo, station, companyName, brandName, selectedBrands, advtEditionType } = req.body;

        //const query = { isReleased: true, isCancelled: false };
        const query = {};

        if (roNumberFrom && roNumberTo) {
            query.roNumber = {
                $gte: roNumberFrom,
                $lte: roNumberTo
            };
        }

        // if (mode && fromDate && toDate) {
        //     const dateTo = new Date(toDate);
        //     dateTo.setDate(dateTo.getDate() + 1);
        //     query.mode = mode
        //     query.fromDate = {
        //         $gte: new Date(fromDate),

        //     };
        //     query.toDate = {

        //         $lte: new Date(dateTo),
        //     };
        // }

        if (companyName) {

            query.companyName = new RegExp(companyName, 'i')

        }
        if (station) {

            query.station = new RegExp(station, 'i')

        }


        if (brandName) {

            query.brandName = brandName
        }

        // if (selectedBrands) {

        //     query.selectedBrands = new RegExp(selectedBrands, 'i')

        // }
        // if (advtEditionType) {

        //     query.advtEditionType = new RegExp(advtEditionType, 'i')


        // }


        //  console.log(query)

        const RadioFCTs = await RadioFCT.find(query)
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
            .select("roNumber media client companyName channel agencyNameForBilling advertiserNameForBilling station adDuration gst nettAmount remindStatus isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId roDate createdAt").sort({ "roNumber": -1 });

        return res.json({ status: true, data: RadioFCTs });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};

exports.deleteRadioFCT = async (req, res) => {
    try {

        const { id } = req.params;


        const RadioFCTs = await RadioFCT.findByIdAndDelete(id)
        if (RadioFCTs) {

            return res.json({ status: true, message: "Deleted succesfully." });
        }
        return res.json({ status: false, message: "Unable to delete.!!!" });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};


//////////////////////////////////////////////////   NTR ///////////////////////////////////////////////////////////////

exports.addRadioNTR = async (req, res) => {
    let data = req.body;

    const TagLineFile = req.files['attachmentFile'] ? req.files['attachmentFile'][0] : null;
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

    data.attachmentFile = uploadedFile;

    //console.log(data)
    data.roNumber = await GenerateNewRoNumber()


    if (data && data.coSponsor == 'false') {

        data.csProgramDate = null
        data.csSelectedPrograms = []
    }
    if (data && data.namingRights == 'false') {

        data.nrProgramDate = null
        data.nrSelectedPrograms = null
    }
    if (data && data.dayBranding == 'false') {

        data.dbProgramDate = null

    }
    if (data && data.assocDayBranding == 'false') {

        data.adbProgramDate = null

    }


    RadioNTR.create(data)
        .then((latestRadioNTR) => {
            if (latestRadioNTR) {
                return res.json({ "status": true, "message": "Added successfully." });
            } else {
                throw new Error("Oops! Something went wrong.");
            }
        })
        .catch((error) => {
            console.error(error);
            return res.json({ "status": false, "message": error.message || "Oops! Something went wrong. Please try again later" });
        });
};


exports.updateRadioNTRDetail = async (req, res) => {
    try {
        let data = req.body;

        const TagLineFile = req.files['attachmentFile'] ? req.files['attachmentFile'][0] : null;

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

        data.attachmentFile = uploadedFile;


        if (data && data.coSponsor == 'false') {

            data.csProgramDate = null
            data.csSelectedPrograms = []
        }
        if (data && data.namingRights == 'false') {

            data.nrProgramDate = null
            data.nrSelectedPrograms = null
        }
        if (data && data.dayBranding == 'false') {

            data.dbProgramDate = null

        }
        if (data && data.assocDayBranding == 'false') {

            data.adbProgramDate = null

        }


        RadioNTR.findById(data._id)
            .then((exRadioNTR) => {
                if (exRadioNTR) {
                    RadioNTR.findByIdAndUpdate(data._id, { $set: data }, { new: true })
                        .then((newRadioNTR) => {
                            if (newRadioNTR) {
                                return res.json({ "status": true, "message": "Updated successfully." });
                            } else {
                                throw new Error("Does not exist.!!!");
                            }
                        }).catch((error) => {

                            return res.json({ "status": false, "message": error.message });
                        });
                } else {
                    throw new Error("Does not exist.!!!");
                }
            }).catch((error) => {

                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};
exports.fetchRadioNTRGenerated = (req, res) => {
    try {
        let data = req.params;

        RadioNTR.findById(data.id)
        .select("roNumber isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId")
            .then((exRadioNTR) => {

                return res.json({ "status": true, "data": exRadioNTR });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};
exports.fetchRadioNTRDetail = (req, res) => {
    try {
        let data = req.params;

        RadioNTR.findById(data.id)
            .then((exRadioNTR) => {

                return res.json({ "status": true, "data": exRadioNTR });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.RadioNTRList = async (req, res) => {
    try {
        const { roNumberFrom, roNumberTo, station, companyName, brandName, selectedBrands, advtEditionType } = req.body;

        //const query = { isReleased: true, isCancelled: false };
        const query = {};

        if (roNumberFrom && roNumberTo) {
            query.roNumber = {
                $gte: roNumberFrom,
                $lte: roNumberTo
            };
        }

        // if (mode && fromDate && toDate) {
        //     const dateTo = new Date(toDate);
        //     dateTo.setDate(dateTo.getDate() + 1);
        //     query.mode = mode
        //     query.fromDate = {
        //         $gte: new Date(fromDate),

        //     };
        //     query.toDate = {

        //         $lte: new Date(dateTo),
        //     };
        // }

        if (companyName) {

            query.companyName = new RegExp(companyName, 'i')

        }
        if (station) {

            query.station = new RegExp(station, 'i')

        }


        if (brandName) {

            query.brandName = brandName
        }

        // if (selectedBrands) {

        //     query.selectedBrands = new RegExp(selectedBrands, 'i')

        // }
        // if (advtEditionType) {

        //     query.advtEditionType = new RegExp(advtEditionType, 'i')


        // }


        //  console.log(query)

        const RadioNTRs = await RadioNTR.find(query)
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
            .select("roNumber media client companyName channel agencyNameForBilling advertiserNameForBilling station adDuration gst nettAmount remindStatus isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId roDate createdAt").sort({ "roNumber": -1 });

        return res.json({ status: true, data: RadioNTRs });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};

exports.deleteRadioNTR = async (req, res) => {
    try {

        const { id } = req.params;


        const RadioNTRs = await RadioNTR.findByIdAndDelete(id)
        if (RadioNTRs) {

            return res.json({ status: true, message: "Deleted succesfully." });
        }
        return res.json({ status: false, message: "Unable to delete.!!!" });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};



//////////////////////////////////////////////////   NFCT ///////////////////////////////////////////////////////////////

exports.addRadioNFCT = async (req, res) => {
    let data = req.body;

    const TagLineFile = req.files['attachmentFile'] ? req.files['attachmentFile'][0] : null;
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

    data.attachmentFile = uploadedFile;

    //console.log(data)
    data.roNumber = await GenerateNewRoNumber()

    if (data && data.coSponsor == 'false') {

        data.csProgramDate = null
        data.csSelectedPrograms = []
    }
    if (data && data.namingRights == 'false') {

        data.nrProgramDate = null
        data.nrSelectedPrograms = null
    }
    if (data && data.dayBranding == 'false') {

        data.dbProgramDate = null

    }
    if (data && data.assocDayBranding == 'false') {

        data.adbProgramDate = null

    }

    RadioNFCT.create(data)
        .then((latestRadioNFCT) => {
            if (latestRadioNFCT) {
                return res.json({ "status": true, "message": "Added successfully." });
            } else {
                throw new Error("Oops! Something went wrong.");
            }
        })
        .catch((error) => {
            console.error(error);
            return res.json({ "status": false, "message": error.message || "Oops! Something went wrong. Please try again later" });
        });
};


exports.updateRadioNFCTDetail = async (req, res) => {
    try {
        let data = req.body;

        const TagLineFile = req.files['attachmentFile'] ? req.files['attachmentFile'][0] : null;

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

        data.attachmentFile = uploadedFile;


        if (data && data.coSponsor == 'false') {

            data.csProgramDate = null
            data.csSelectedPrograms = []
        }
        if (data && data.namingRights == 'false') {

            data.nrProgramDate = null
            data.nrSelectedPrograms = null
        }
        if (data && data.dayBranding == 'false') {

            data.dbProgramDate = null

        }
        if (data && data.assocDayBranding == 'false') {

            data.adbProgramDate = null

        }


        RadioNFCT.findById(data._id)
            .then((exRadioNFCT) => {
                if (exRadioNFCT) {
                    RadioNFCT.findByIdAndUpdate(data._id, { $set: data }, { new: true })
                        .then((newRadioNFCT) => {
                            if (newRadioNFCT) {
                                return res.json({ "status": true, "message": "Updated successfully." });
                            } else {
                                throw new Error("Does not exist.!!!");
                            }
                        }).catch((error) => {

                            return res.json({ "status": false, "message": error.message });
                        });
                } else {
                    throw new Error("Does not exist.!!!");
                }
            }).catch((error) => {

                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.fetchRadioNFCTDetail = (req, res) => {
    try {
        let data = req.params;

        RadioNFCT.findById(data.id)
            .then((exRadioNFCT) => {

                return res.json({ "status": true, "data": exRadioNFCT });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};
exports.fetchRadioNFCTGenerated = (req, res) => {
    try {
        let data = req.params;

        RadioNFCT.findById(data.id)
        .select("roNumber isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId")
            .then((exRadioNFCT) => {

                return res.json({ "status": true, "data": exRadioNFCT });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};
exports.RadioNFCTList = async (req, res) => {
    try {

        const { roNumberFrom, roNumberTo, station, fromDate, toDate, companyName, duration, agencyNameForBilling, advertiserNameForBilling } = req.body;

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
        if (station) {

            query.station = new RegExp(station, 'i')

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


        const RadioNFCTs = await RadioNFCT.find(query)
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
            .select("roNumber media client companyName channel agencyNameForBilling advertiserNameForBilling station adDuration gst nettAmount remindStatus isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId roDate createdAt").sort({ "roNumber": -1 });

        return res.json({ status: true, data: RadioNFCTs });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};

exports.deleteRadioNFCT = async (req, res) => {
    try {

        const { id } = req.params;


        const RadioNFCTs = await RadioNFCT.findByIdAndDelete(id)
        if (RadioNFCTs) {

            return res.json({ status: true, message: "Deleted succesfully." });
        }
        return res.json({ status: false, message: "Unable to delete.!!!" });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};



//////////////////////////////////////////////////   RJ - Mention ///////////////////////////////////////////////////////

exports.addRadioRjMention = async (req, res) => {
    let data = req.body;

    const TagLineFile = req.files['attachmentFile'] ? req.files['attachmentFile'][0] : null;
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

    data.attachmentFile = uploadedFile;

    //console.log(data)
    data.roNumber = await GenerateNewRoNumber()
    if (data && data.coSponsor == 'false') {

        data.csProgramDate = null
        data.csSelectedPrograms = []
    }
    if (data && data.namingRights == 'false') {

        data.nrProgramDate = null
        data.nrSelectedPrograms = null
    }
    if (data && data.dayBranding == 'false') {

        data.dbProgramDate = null

    }
    if (data && data.assocDayBranding == 'false') {

        data.adbProgramDate = null

    }

    RadioRjMention.create(data)
        .then((latestRadioRjMention) => {
            if (latestRadioRjMention) {
                return res.json({ "status": true, "message": "Added successfully." });
            } else {
                throw new Error("Oops! Something went wrong.");
            }
        })
        .catch((error) => {
            console.error(error);
            return res.json({ "status": false, "message": error.message || "Oops! Something went wrong. Please try again later" });
        });
};


exports.updateRadioRjMentionDetail = async (req, res) => {
    try {
        let data = req.body;

        const TagLineFile = req.files['attachmentFile'] ? req.files['attachmentFile'][0] : null;

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

        data.attachmentFile = uploadedFile;
        data.attachmentFile = uploadedFile;
        if (data && data.coSponsor == 'false') {

            data.csProgramDate = null
            data.csSelectedPrograms = []
        }
        if (data && data.namingRights == 'false') {

            data.nrProgramDate = null
            data.nrSelectedPrograms = null
        }
        if (data && data.dayBranding == 'false') {

            data.dbProgramDate = null

        }
        if (data && data.assocDayBranding == 'false') {

            data.adbProgramDate = null

        }

        RadioRjMention.findById(data._id)
            .then((exRadioRjMention) => {
                if (exRadioRjMention) {
                    RadioRjMention.findByIdAndUpdate(data._id, { $set: data }, { new: true })
                        .then((newRadioRjMention) => {
                            if (newRadioRjMention) {
                                return res.json({ "status": true, "message": "Updated successfully." });
                            } else {
                                throw new Error("Does not exist.!!!");
                            }
                        }).catch((error) => {

                            return res.json({ "status": false, "message": error.message });
                        });
                } else {
                    throw new Error("Does not exist.!!!");
                }
            }).catch((error) => {

                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.fetchRadioRjMentionDetail = (req, res) => {
    try {
        let data = req.params;

        RadioRjMention.findById(data.id)
            .then((exRadioRjMention) => {

                return res.json({ "status": true, "data": exRadioRjMention });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};
exports.fetchRadioRjMentionGenerated = (req, res) => {
    try {
        let data = req.params;

        RadioRjMention.findById(data.id)
        .select("roNumber isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId")
            .then((exRadioRjMention) => {

                return res.json({ "status": true, "data": exRadioRjMention });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};
exports.RadioRjMentionList = async (req, res) => {
    try {

        const { roNumberFrom, roNumberTo, station, fromDate, toDate, companyName, duration, agencyNameForBilling, advertiserNameForBilling } = req.body;

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
        if (station) {

            query.station = new RegExp(station, 'i')

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


        const RadioRjMentions = await RadioRjMention.find(query)
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
            .select("roNumber media client companyName channel agencyNameForBilling advertiserNameForBilling station adDuration gst nettAmount remindStatus isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId roDate createdAt").sort({ "roNumber": -1 });

        return res.json({ status: true, data: RadioRjMentions });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};

exports.deleteRadioRjMention = async (req, res) => {
    try {

        const { id } = req.params;


        const RadioRjMentions = await RadioRjMention.findByIdAndDelete(id)
        if (RadioRjMentions) {

            return res.json({ status: true, message: "Deleted succesfully." });
        }
        return res.json({ status: false, message: "Unable to delete.!!!" });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};
