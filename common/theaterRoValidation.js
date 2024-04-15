const validator = require('node-validator');

let emptycheck = /([^\s])/;

exports.postValidation = (req, res, next) => {

    try {
        let path = req.route.path;
        let data = req.body;
        let check;
        console.log(path,"path")

        if (path == '/crtThrOnScrnRo') {
            check = validator.isObject()           
                .withRequired('clientName', validator.isString({ regex: emptycheck, message: "clientName is required" }))
                .withRequired('brandName', validator.isString({ regex: emptycheck, message: "brandName is required" }))
                 .withRequired('theaterName', validator.isString({ regex: emptycheck, message: "theaterName is required" }))
                 .withRequired('theaterAddress', validator.isString({ regex: emptycheck, message: "theaterAddress is required" }))
                 .withRequired('campaingPeriod', validator.isArray())
                 .withRequired('campCount', validator.isString({ regex: emptycheck, message: "campCount is required" }))
                 .withRequired('noOfWeeks', validator.isString({ regex: emptycheck, message: "noOfWeeks is required" }))
                 .withRequired('noOfScreens', validator.isString({ regex: emptycheck, message: "noOfScreens is required" }))
                 .withRequired('addDuration', validator.isString({ regex: emptycheck, message: "addDuration is required" }))
                 .withRequired('position', validator.isString({ regex: emptycheck, message: "position is required" }))
                 .withRequired('content', validator.isString({ regex: emptycheck, message: "content is required" }))
                 .withRequired('theaterList', validator.isString({ regex: emptycheck, message: "theaterList is required" }))
                 .withRequired('discountType', validator.isString({ regex: emptycheck, message: "discountType is required" }))
                 .withRequired('netAmount', validator.isNumber({ regex: emptycheck, message: "netAmount is required" }))
                 .withRequired('gstAmount', validator.isNumber({ regex: emptycheck, message: "gstAmount is required" }))
                 .withRequired('clntDisType', validator.isString({ regex: emptycheck, message: "clntDisType is required" }))
                 .withRequired('clntDisValue', validator.isNumber({ regex: emptycheck, message: "clntDisValue is required" }))
                 .withRequired('clntDisAmt', validator.isNumber({ regex: emptycheck, message: "clntDisAmt is required" }))
                 .withRequired('clntGst', validator.isNumber({ regex: emptycheck, message: "clntGst is required" }))
                 .withRequired('clntBillVal', validator.isNumber({ regex: emptycheck, message: "clntBillVal is required" }))
                 .withRequired('note', validator.isString({ regex: emptycheck, message: "note is required" }))
                 .withRequired('totalAmount', validator.isNumber({ regex: emptycheck, message: "totalAmount is required" }))
                 .withRequired('clntTotalAmount', validator.isNumber({ regex: emptycheck, message: "clntTotalAmount is required" }))
                 .withRequired('discountValue', validator.isNumber({ regex: emptycheck, message: "discountValue is required" }))
                 .withRequired('clntNetAmt', validator.isNumber({ regex: emptycheck, message: "clntNetAmt is required" }))
                 .withRequired('totalPayable', validator.isNumber({ regex: emptycheck, message: "totalPayable is required" }))
                 .withRequired('disValue', validator.isNumber({ regex: emptycheck, message: "disValue is required" }))
                 .withOptional('theaterListUrl')
                 .withOptional('attachmentUrl')


        }else if(path == "/crtThrOffScrnRo"){
            check = validator.isObject()
                .withRequired('clientName', validator.isString({ regex: emptycheck, message: "clientName is required" }))
                .withRequired('brandName', validator.isString({ regex: emptycheck, message: "brandName is required" }))
                .withRequired('theaterName', validator.isString({ regex: emptycheck, message: "theaterName is required" }))
                .withRequired('theaterAddress', validator.isString({ regex: emptycheck, message: "theaterName is required" }))
                .withRequired('campaingPeriod', validator.isArray())
                .withRequired('noOfMonth', validator.isString({ regex: emptycheck, message: "noOfMonth is required" }))
                .withRequired('addType', validator.isString({ regex: emptycheck, message: "addType is required" }))
                .withRequired('location', validator.isString({ regex: emptycheck, message: "location is required" }))
                .withRequired('position', validator.isString({ regex: emptycheck, message: "position is required" }))
                .withRequired('size', validator.isString({ regex: emptycheck, message: "size is required" }))
                .withRequired('materialType', validator.isString({ regex: emptycheck, message: "materialType is required" }))
                .withRequired('discountType', validator.isString({ regex: emptycheck, message: "discountType is required" }))
                .withRequired('discountValue', validator.isNumber({ regex: emptycheck, message: "discountValue is required" }))
                .withRequired('netAmount', validator.isNumber({ regex: emptycheck, message: "netAmount is required" }))
                .withRequired('gstAmount', validator.isNumber({ regex: emptycheck, message: "gstAmount is required" }))
                .withRequired('totalPay', validator.isNumber({ regex: emptycheck, message: "totalPay is required" }))
                .withRequired('clntDisType', validator.isString({ regex: emptycheck, message: "clntDisType is required" }))
                .withRequired('clntRate', validator.isNumber({ regex: emptycheck, message: "clntRate is required" }))
                .withRequired('clntDisValue', validator.isNumber({ regex: emptycheck, message: "clntDisValue is required" }))
                .withRequired('clntDisAmt', validator.isNumber({ regex: emptycheck, message: "clntDisAmt is required" }))
                .withRequired('clntGst', validator.isNumber({ regex: emptycheck, message: "clntGst is required" }))
                .withRequired('clntBillVal', validator.isNumber({ regex: emptycheck, message: "clntBillVal is required" }))
                .withRequired('totalAmount', validator.isNumber({ regex: emptycheck, message: "totalAmount is required" }))
                .withRequired('attachmentUrl', validator.isString({ regex: emptycheck, message: "clntDisType is required" }))

                // .withOptional('campaingPeriod', validator.isString({ regex: emptycheck, message: "campaingPeriod is required" }))
                .withRequired('note', validator.isString({ regex: emptycheck, message: "note is required" }))

        }
        
        validator.run(check, data, (errorcount, errors) => {
            
            if (errorcount == 0) {
                next();
            } else {
                console.log(errors,"errors")
                let errormsg = '';
                for (let i = 0; i < errors.length; i++) {
                    if (errormsg != '') {
                        errormsg += ', ';
                    }
                    if (errors[i].message == 'Required value.' && errors[i].value == undefined) {
                        errors[i].message = errors[i].parameter + ' is required'
                    } else if (errors[i].value != undefined || errors[i].value == "" || errors[i].value == [] || errors[i].message == "Unexpected value.") {
                        errors[i].message = "Not a valid " + errors[i].parameter
                    } else {
                        errors[i].message = errors[i].message;
                    }
                    errormsg += errors[i].message;
                }
                res.json({ "status": false, "message": errormsg })
            }
        })
    } catch (e) {
        console.log("Error catched in validation", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}