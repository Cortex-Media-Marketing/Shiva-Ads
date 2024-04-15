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