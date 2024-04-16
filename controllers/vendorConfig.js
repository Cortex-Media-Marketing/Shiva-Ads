const { NewsPaperVendor, TVVendor, RadioVendor,OOHVendor ,YouTubeVendor ,TheatreVendor ,OtherVendor} = require('../models/vendor');

exports.addVendor = (req, res, model) => {
    try {
        let data = req.body;

        model.create(data)
            .then((check) => {
                if (check) {
                    return res.json({ "status": true, "message": "Added successfully." });
                } else {
                    throw new Error("Oops! Something went wrong.");
                }
            }).catch((erorr) => {
                return res.json({ "status": false, "message": erorr.message });
            });

    } catch (e) {
        console.error(e);
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.updateVendorDetail = (req, res, model) => {
    try {
        let data = req.body;

        model.findById(data._id)
            .then((exVendor) => {
                if (exVendor) {
                    model.findByIdAndUpdate(data._id, { $set: data }, { new: true })
                        .then((newVendor) => {
                            if (newVendor) {
                                return res.json({ "status": true, "message": "Updated successfully." });
                            } else {
                                throw new Error("Does not exist.!!!");
                            }
                        }).catch((erorr) => {

                            return res.json({ "status": false, "message": erorr.message });
                        });
                } else {
                    throw new Error("Does not exist.!!!");
                }
            }).catch((erorr) => {

                return res.json({ "status": false, "message": erorr.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.fetchVendorDetail = (req, res, model) => {
    try {
        let data = req.params;

        model.findById(data.id)
            .then((exVendor) => {

                return res.json({ "status": true, "data": exVendor });

            }).catch((erorr) => {
                return res.json({ "status": false, "message": erorr.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.VendorList = async (req, res, model) => {
    try {
        const { name, district, contactNumber, email, category } = req.body;

        const query = {};

        if (category) {

            query["category"] = new RegExp(category, 'i')

        }
        if (name) {

            query.name = new RegExp(name, 'i')

        }
        if (district) {

            query.district = new RegExp(district, 'i')

        }

        if (contactNumber) {

            query["contactNumbers.contactNumber"] = new RegExp(contactNumber, 'i')

        }
        if (email) {

            query["contactEmails.email"] = new RegExp(email, 'i')

        }




        const Vendors = await model.find(query)

            .select("category name type companyName channelName agencyName advertiserName brandName contactNumbers.timingFrom contactNumbers.contactNumber district contactEmails.email").sort({ "createdAt": -1 });

        return res.json({ status: true, data: Vendors });
    } catch (erorr) {
        console.error(erorr);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};

exports.deleteVendor = async (req, res, model) => {
    try {

        const { id } = req.params;


        const Vendors = await model.findByIdAndDelete(id)
        if (Vendors) {

            return res.json({ status: true, message: "Deleted succesfully." });
        }
        return res.json({ status: false, message: "Unable to delete.!!!" });
    } catch (erorr) {
        console.error(erorr);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};


module.exports = {

////////////////////////////////////////////////////////// News Paper Vendors //////////////////////////////////////////////

addNewsPaperVendor : (req, res) => {
    exports.addVendor(req, res, NewsPaperVendor);
},
updateNewsPaperVendor : (req, res) => {
    exports.updateVendorDetail(req, res, NewsPaperVendor);
},
fetchNewsPaperVendor : (req, res) => {
    exports.fetchVendorDetail(req, res, NewsPaperVendor);
},

};


