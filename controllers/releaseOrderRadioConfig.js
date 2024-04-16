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

