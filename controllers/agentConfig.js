const subAgent = require('../models/subAgent')
const { uuid } = require('uuidv4');


exports.crtSubAgent = async (req, res) => {
    try {

        const reqData = req.body

        const isExist = await subAgent.find({name:reqData.name})
        if(isExist.length == 0 ){
            subAgent.create(reqData)
            .then((check) => {
                if (check) {
                    return res.json({ "status": true, "message": "subagent added successfully." });
                } else {
                    return res.json({ "status": false,"message": "Oops! Something went wrong."});
                }
            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });

        }else{
            return res.json({ "status": false, "message": "subAgent name already exist. " });

        }

    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};

exports.uptSubAgent = async (req, res) => {
    try {
        const data = req.body
        subAgent.findByIdAndUpdate(data.agentId, { $set: data }, { new: true })
        .then((resp) => {
                            if (resp) {
                                return res.json({ "status": true, "message": "SubAgent updated successfully." });
                            } else {
                                return res.json({ "status": false,message: "SubAgent does not exist."});
                            }
        })
        .catch((error) => {
            return res.json({ "status": false, "message": error.message });
        });

    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
};
