const OohHoardingModel = require('../models/releaseOrderOOHHoardings')
const OohBusAdModel = require('../models/releaseOrderOOHBusAD')
const { fileUpload } = require('../common/aws');
const { GenerateNewRoNumber } = require('../common/nommoc');

exports.addOohHoarding = async (req, res) => {
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

    OohHoardingModel.create(data)
        .then((latestTVRO) => {
            if (latestTVRO) {
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


exports.updateOohHoardingDetail = async (req, res) => {
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

        OohHoardingModel.findById(data._id)
            .then((exTVRO) => {
                if (exTVRO) {
                    OohHoardingModel.findByIdAndUpdate(data._id, { $set: data }, { new: true })
                        .then((newTVRO) => {
                            if (newTVRO) {
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

exports.fetchOohHoardingDetail = (req, res) => {
    try {
        let data = req.params;

        OohHoardingModel.findById(data.id)
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
