const NewsPaperRO = require('../models/releaseOrderOfNewsPaper')
const NewsPaperROShifting = require('../models/advtShiftingNewspaperRO')
const Admin = require("../models/admin");
const BussinessCategory = require('../models/busCategory')
const DataSource = require('../models/dataSource')
const Client = require('../models/client')
const SubAgent = require('../models/subAgent')
const IssueType = require('../models/subIssue')
const IssuesOrMalarModel = require('../models/issueTyp')
const DiscountCategory = require('../models/discountCategory')

exports.addNewsPaperRO = (req, res) => {
    try {
        let data = req.body;


        NewsPaperRO.findOne({}, {}, { sort: { 'roNumber': -1 } })
            .then((latestNewsPaperRO) => {
                let counterValue = latestNewsPaperRO ? latestNewsPaperRO.roNumber + 1 : 1;

                let matchDate = counterValue.toString()
                let fetchYear = 0, fetchMonth = 0

                if (matchDate && matchDate.length > 6) {
                    fetchYear = Number(matchDate.slice(0, 4)) * 1000000;
                    fetchMonth = Number(matchDate.slice(4, 6)) * 10000;
                }

                const currentDate = new Date(Date.now());
                const currentYear = currentDate.getFullYear() * 1000000;
                const currentMonth = (currentDate.getMonth() + 1) * 10000;
                //console.log("check",fetchMonth,fetchMonth,RONP + currentYear + currentMonth + counterValue);RONP

                data.roNumber = (fetchYear == currentYear && fetchMonth == currentMonth) ? latestNewsPaperRO.roNumber + 1 : (currentYear + currentMonth + 1);

                NewsPaperRO.create(data)
                    .then((check) => {
                        if (check) {
                            return res.json({ "status": true, "message": "News Paper Release Order added successfully." });
                        } else {
                            throw new Error("Oops! Something went wrong.");
                        }
                    }).catch((error) => {
                        return res.json({ "status": false, "message": error.message });
                    });
            });
    } catch (e) {
        console.error(e);
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.updateNewsPaperRODetail = (req, res) => {
    try {
        let data = req.body;

        NewsPaperRO.findById(data._id)
            .then((exNewsPaperRO) => {
                if (exNewsPaperRO) {
                    NewsPaperRO.findByIdAndUpdate(data._id, { $set: data }, { new: true })
                        .then((newNewsPaperRO) => {
                            if (newNewsPaperRO) {
                                return res.json({ "status": true, "message": "NewsPaperRO data updated successfully." });
                            } else {
                                throw new Error("NewsPaperRO does not exist.!!!");
                            }
                        }).catch((error) => {

                            return res.json({ "status": false, "message": error.message });
                        });
                } else {
                    throw new Error("NewsPaperRO does not exist.!!!");
                }
            }).catch((error) => {

                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

// exports.fetchNewsPaperRODetail = (req, res) => {
//     try {
//         let data = req.params;

//         NewsPaperRO.findById(data.id)
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
//             .then((exNewsPaperRO) => {

//                 return res.json({ "status": true, "data": exNewsPaperRO });

//             }).catch((error) => {
//                 return res.json({ "status": false, "message": error.message });
//             });
//     } catch (e) {
//         console.error(e)
//         return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
//     }
// };
exports.fetchNewsPaperRODetail = (req, res) => {
    try {
        let data = req.params;

        NewsPaperRO.findById(data.id)
            .then((exNewsPaperRO) => {

                return res.json({ "status": true, "data": exNewsPaperRO });

            }).catch((error) => {
                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {
        console.error(e)
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};
