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
