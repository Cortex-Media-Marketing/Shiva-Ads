const Client = require('../models/client')
const BussinessCategory = require('../models/busCategory')
const DataSource = require('../models/dataSource')
const DesignationModel = require('../models/clientDesignation')
const ContactTypeModel = require('../models/contactType')


exports.addAClient = async (req, res) => {
    try {
        let data = req.body;

        const isClientExist = await Client.find({ clientName: data.clientName })
        if (isClientExist.length == 0) {

            Client.create(data)
                .then((check) => {
                    if (check) {
                        return res.json({ "status": true, "message": "Client added successfully." });
                    } else {
                        return res.json({ "status": false, message: "Oops! Something went wrong." });
                    }
                }).catch((error) => {
                    return res.json({ "status": false, "message": error.message });
                });
        } else {
            return res.json({ "status": false, "message": "Client name already exist. " });

        }


    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.updateClientDetail = (req, res) => {
    try {
        let data = req.body;

        Client.findById(data.clientId)
            .then((exClient) => {
                if (exClient) {
                    Client.findByIdAndUpdate(data.clientId, { $set: data }, { new: true })
                        .then((newClient) => {
                            if (newClient) {
                                return res.json({ "status": true, "message": "Client data updated successfully." });
                            } else {
                                return res.json({ "status": false, message: "Client does not exist." });
                            }
                        }).catch((error) => {

                            return res.json({ "status": false, "message": error.message });
                        });
                } else {
                    return res.json({ "status": false, message: "Client does not exist." });
                }
            }).catch((error) => {

                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

// exports.fetchClientDetail = (req, res) => {
//     try {
//         let data = req.params;

//         Client.findById(data.clientId)
//             .populate({
//                 path: 'bussinessCategory',
//                 model: BussinessCategory,
//                 select: 'businessCatName'
//             })
//             .populate({
//                 path: 'contactNumbers.designation',
//                 model: DesignationModel,
//                 select: 'name'
//             })
//             .populate({
//                 path: 'contactNumbers.contactType',
//                 model: ContactTypeModel,
//                 select: 'name'
//             })
//             .populate({
//                 path: 'contactEmails.designation',
//                 model: DesignationModel,
//                 select: 'name'
//             }).then((exClient) => {

//                 return res.json({ "status": true, "data": exClient });

//             }).catch((error) => {
//                 return res.json({ "status": false, "message": error.message });
//             });
//     } catch (e) {
//         console.error(e)
//         return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
//     }
// };
exports.fetchClientDetail = (req, res) => {
    try {
        let data = req.params;

        Client.findById(data.clientId)
            // .populate({
            //     path: 'bussinessCategory',
            //     model: BussinessCategory,
            //     select: 'businessCatName'
            // })
            // .populate({
            //     path: 'contactNumbers.designation',
            //     model: DesignationModel,
            //     select: 'name'
            // })
            // .populate({
            //     path: 'contactNumbers.contactType',
            //     model: ContactTypeModel,
            //     select: 'name'
            // })
            // .populate({
            //     path: 'contactEmails.designation',
            //     model: DesignationModel,
            //     select: 'name'
            // })
            .then((exClient) => {

                return res.json({ "status": true, "data": exClient });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.fetchClientList = async (req, res) => {
    try {
        const { clientName, dataSource, bussinessCategory, clientType, discount, gstNo } = req.body;

        const query = {};

        if (clientName) {
            query.clientName = { $regex: new RegExp(clientName, 'i') };
        }

        if (dataSource) {
            //let fetchDataSource = await DataSource.findOne({ "dataSrc": new RegExp(dataSource, 'i') }).select("_id")
            // console.log(fetchDataSource)
            query.dataSource = new RegExp(dataSource, 'i')
        }

        if (bussinessCategory) {
            let fetchBussinessCategory = await BussinessCategory.findOne({ "businessCatName": new RegExp(bussinessCategory, 'i') }).select("_id")
            // console.log(fetchBussinessCategory)
            //query.bussinessCategory = fetchBussinessCategory._id;
            query.bussinessCategory = new RegExp(bussinessCategory, 'i');
        }

        if (clientType) {
            query.clientType = { $regex: new RegExp(clientType, 'i') };
        }

        if (discount) {
            query.discount = { $regex: new RegExp(discount, 'i') };
        }

        if (gstNo) {
            query.gstNo = { $regex: new RegExp(gstNo, 'i') };
        }

        const clients = await Client.find(query)
            // .populate({
            //     path: 'dataSource',
            //     model: DataSource,
            //     select: 'dataSrc'
            // })
            //     .populate({
            //         path: 'bussinessCategory',
            //         model: BussinessCategory,
            //         select: 'businessCatName'
            //     })
            .select("clientName dataSource bussinessCategory clientType discount gstNo createdAt");

        return res.json({ status: true, data: clients });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};

exports.deleteClient = async (req, res) => {
    try {

        const { clientId } = req.params;


        const clients = await Client.findByIdAndDelete(clientId)
        if (clients) {

            return res.json({ status: true, message: "Deleted succesfully." });
        }
        return res.json({ status: false, message: "Unable to delete.!!!" });
    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};


