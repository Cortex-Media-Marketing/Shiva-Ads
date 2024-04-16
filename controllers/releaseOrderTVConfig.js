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
