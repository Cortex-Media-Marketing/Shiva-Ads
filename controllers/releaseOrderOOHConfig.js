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

exports.fetchOohHoardingGenerated = (req, res) => {
    try {
        let data = req.params;

        OohHoardingModel.findById(data.id)
        .select("roNumber isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId")
            .then((exOohHoarding) => {

                return res.json({ "status": true, "data": exOohHoarding });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};


exports.oohHoardingList = async (req, res) => {
    try {
        const { roNumberFrom, roNumberTo, clientName,fromDate ,toDate, brand, advertisementType, location, sizeInFeet } = req.body;

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

        if (brand) {

            query.brand = new RegExp(brand, 'i')

        }
        if (clientName) {

            query.clientName = new RegExp(clientName, 'i')

        }


        if (advertisementType) {

            query.adadvertisementType = advertisementType
        }

        if (location) {

            query.location = new RegExp(location, 'i')

        }
        if (sizeInFeet) {

            query.sizeInFeet = sizeInFeet


        }


        //  console.log(query)

        const TVROs = await OohHoardingModel.find(query).select("roNumber roDate clientName brand advertisementType location sizeInFeet nettAmount gst remindStatus isRoGenerated roUrl isClientRoGenerated isVendorRoGenerated clientRoUrl vendorRoUrl vendorId").sort({ "roNumber": -1 });

        return res.json({ status: true, data: TVROs });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};

exports.deleteOohHoarding = async (req, res) => {
    try {

        const { id } = req.params;


        const TVROs = await OohHoardingModel.findByIdAndDelete(id)
        if (TVROs) {

            return res.json({ status: true, message: "Deleted succesfully." });
        }
        return res.json({ status: false, message: "Unable to delete.!!!" });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};



///////////////////////////////////////////        BusAds       /////////////////////////////////////////////////////


exports.addOohBusAd = async (req, res) => {
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

    OohBusAdModel.create(data)
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


exports.updateOohBusAdDetail = async (req, res) => {
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

        OohBusAdModel.findById(data._id)
            .then((exTVRO) => {
                if (exTVRO) {
                    OohBusAdModel.findByIdAndUpdate(data._id, { $set: data }, { new: true })
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
