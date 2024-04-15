const validator = require('node-validator');

let emptycheck = /([^\s])/;

exports.postValidation = (req, res, next) => {

    try {
        let path = req.route.path;
        let data = req.body;
        let check;
        if (path == '/crtBank') {
            check = validator.isObject()
                .withRequired('bName', validator.isString({ regex: emptycheck, message: "bName is required" }))
        }else if(path == "/updBank"){
            check = validator.isObject()
            .withRequired('bName', validator.isString({ regex: emptycheck, message: "bName is required" }))
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtIssueType') {
            check = validator.isObject()
                .withRequired('isuName', validator.isString({ regex: emptycheck, message: "isuName is required" }))
        }else if(path == "/updIssueType"){
            check = validator.isObject()
            .withRequired('isuName', validator.isString({ regex: emptycheck, message: "bName is required" }))
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtSchema') {
            check = validator.isObject()
                .withRequired('schmName', validator.isString({ regex: emptycheck, message: "isuName is required" }))
        }else if(path == "/updSchema"){
            check = validator.isObject()
            .withRequired('schmName', validator.isString({ regex: emptycheck, message: "bName is required" }))
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtCategory') {
            check = validator.isObject()
                .withRequired('catName', validator.isString({ regex: emptycheck, message: "bName is required" }))
        }else if(path == "/updCategory"){
            check = validator.isObject()
            .withRequired('catName', validator.isString({ regex: emptycheck, message: "bName is required" }))
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtBusCategory') {
            check = validator.isObject()
                .withRequired('busCatName', validator.isString({ regex: emptycheck, message: "busCatName is required" }))
                .withRequired('catId', validator.isString({ regex: emptycheck, message: "catId is required" }))
        }else if(path == "/updBusCategory"){
            check = validator.isObject()
            .withOptional('businessCatName', validator.isString())
            .withOptional('categoryId', validator.isString())
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtAdvtType') {
            check = validator.isObject()
                .withRequired('advertisementType', validator.isString({ regex: emptycheck, message: "advertisementType is required" }))
        }else if(path == "/updAdvtType"){
            check = validator.isObject()
            .withRequired('advertisementType', validator.isString({ regex: emptycheck, message: "advertisementType is required" }))
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtDataSource') {
            check = validator.isObject()
                .withRequired('dataSource', validator.isString({ regex: emptycheck, message: "dataSource is required" }))
        }else if(path == "/updDataSource"){
            check = validator.isObject()
            .withRequired('dataSource', validator.isString({ regex: emptycheck, message: "dataSource is required" }))
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtHue') {
            check = validator.isObject()
                .withRequired('hueValue', validator.isString({ regex: emptycheck, message: "hueValue is required" }))
        }else if(path == "/updHue"){
            check = validator.isObject()
            .withRequired('hueValue', validator.isString({ regex: emptycheck, message: "hueValue is required" }))
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtPage') {
            check = validator.isObject()
            .withRequired('adsIssueId', validator.isString({ regex: emptycheck, message: "adsIssueId is required" }))
            .withRequired('pageNo', validator.isString({ regex: emptycheck, message: "pageNo is required" }))
        }else if(path == "/updPage"){
            check = validator.isObject()
            .withOptional('issueId', validator.isString())
            .withOptional('pageData', validator.isString())
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtDepartment') {
            check = validator.isObject()
            .withRequired('depName', validator.isString({ regex: emptycheck, message: "depName is required" }))
        }else if(path == "/updDepartment"){
            check = validator.isObject()
            .withOptional('depName', validator.isString({ regex: emptycheck, message: "depName is required" }))
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtDesignation') {
            check = validator.isObject()
            .withRequired('departmentId', validator.isString({ regex: emptycheck, message: "departmentId is required" }))
            .withRequired('designationName', validator.isString({ regex: emptycheck, message: "designationName is required" }))
        }else if(path == "/updDesignation"){
            check = validator.isObject()
            .withOptional('depId', validator.isString())
            .withOptional('desName', validator.isString())
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtSubIssueType') {
            check = validator.isObject()
            .withRequired('issueCatName', validator.isString({ regex: emptycheck, message: "issueCatName is required" }))
            .withRequired('isuId', validator.isString({ regex: emptycheck, message: "isuId is required" }))
        }else if(path == "/updSubIssueType"){
            check = validator.isObject()
            .withOptional('issueId', validator.isString())
            .withOptional('issueSubCat', validator.isString())
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtAdvtPosition') {
            check = validator.isObject()
                .withRequired('positionValue', validator.isString({ regex: emptycheck, message: "positionValue is required" }))
        }else if(path == "/updAdvtPosition"){
            check = validator.isObject()
            .withRequired('positionValue', validator.isString({ regex: emptycheck, message: "positionValue is required" }))
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
        }else if (path == '/crtPressReport') {
            check = validator.isObject()
                .withRequired('pressRepName', validator.isString({ regex: emptycheck, message: "pressRepName is required" }))
                .withRequired('providerId', validator.isString({ regex: emptycheck, message: "providerId is required" }))
        }else if(path == "/updPressReport"){
            check = validator.isObject()
            .withOptional('reporterName', validator.isString())
            .withOptional('addProviderId', validator.isString())
            .withRequired('id', validator.isString({ regex: emptycheck, message: "id is required" }))
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