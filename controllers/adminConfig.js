const admin = require("../models/admin");
const EmailTempModel = require("../models/emailTemplate");
const ContactTypeModel = require("../models/contactType");
const DesignationModel = require("../models/clientDesignation");
const NewsPaperModel = require("../models/newsPaper");
const NewsPaperCenterModel = require("../models/newsPaperCenter");
const DiscountCategoryModel = require("../models/discountCategory");
const NoticeTypeModel = require("../models/noticeType");
const GSTModel = require("../models/gst");
const { encrypt, decrypt, createPayloadforAll, generateToken, verifyToken } = require('../common/encDec');
const { GeneratePassword } = require("../common/nommoc");
const nommoc = require("../common/nommoc");
const { SendSMail, fileUpload } = require("../common/aws");
const config = require("../nodedetails/config");
let jwtTokenSuperAdminShivaAdds = config.jwtTokenSuperAdminShivaAdds;
let jwtTokenSuperAdminS2Media = config.jwtTokenSuperAdminS2Media;
const mailVerfUrl = config.mailVerificationURL
const forgotPassAuthURL = config.forgotPassAuthURL

exports.uploadMultipleFiles = async (req, res) => {
    try {
        
        let uploadedFiles = [];
        //console.log(req.files)
        if (req.files && req.files.length != 0) {
            uploadedFiles = await Promise.all((req.files).map(async (file) => {
                return await new Promise((resolve) => {
                    //console.log(file)
                    fileUpload(file, (uploadData) => {
                        //console.log(uploadData)
                        if (uploadData.status) {
                            resolve(uploadData.url);
                        } else {
                            resolve(null); 
                        }
                    }).catch(e => {
                        console.error(e);
                        resolve(null); 
                    });
                });
            }));
        }else{
            return res.json({ "status": false, "message": "Please! select file." });
        }

        let urls = uploadedFiles.filter(url => url !== null); 
        
        return res.json({ "status": true, "data": uploadedFiles });
        
    } catch (e) {
        console.error(e);
        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};




exports.register = (req, res) => {
    try {
        let data = req.body;
        data.email = data.email.toLowerCase();
        data.password = encrypt(GeneratePassword(10));
        admin.findOne({ "email": data.email })
            .then((check) => {
                if (!check) {
                    return admin.create(data);
                } else {
                    throw new Error("Email already registered");
                }
            })
            .then(async (resp) => {
                if (resp) {
                    let verificationLink = `${mailVerfUrl}${resp._id.toString()}`
                    await EmailTempModel.findOne({ "name": "register" }).then(temp => {
                        let dataToReplace = {
                            username: resp.name,
                            link: verificationLink,
                            email: resp.email,
                            password: decrypt(resp.password)
                        }
                        let newTemp = nommoc.UpdateTemplate(temp, dataToReplace)
                        SendSMail(newTemp.body, newTemp.subject, [resp.email]);
                        return res.json({ "status": true, "message": "User added Successfully" });
                    })


                } else {
                    throw new Error("Error Occur While adding a new user");
                }
            })
            .catch((error) => {

                return res.json({ "status": false, "message": error.message });
            });
    } catch (e) {

        return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.verifyAccount = async (req, res) => {

    try {
        let { id } = req.params
        if (!id) {
            return res.json({ "status": false, message: 'id must be present.!!!' });
        }
        const user = await admin.findOneAndUpdate(
            { "_id": id },
            { $set: { isAccountVerified: true } },
            { new: true }
        );
        if (!user) {
            return res.json({ "status": false, message: 'User does not exist.!!!' });
        }
        return res.json({ "status": true, message: 'Account verified successfully.' });
    } catch (error) {
        console.error('Error verifying account:', error);
        return res.json({ message: 'Internal server error' });
    }
}

exports.login = (req, res) => {
    try {
        let data = req.body;
        let email = data.email.toLowerCase();
        let password = encrypt(data.password);

        admin.findOne({ "email": email, "password": password }).exec()
            .then(async (getadmin) => {

                if (getadmin && getadmin.isAccountVerified === false && getadmin.isAccountBlocked === false) {

                    let verificationLink = `${mailVerfUrl}${getadmin._id.toString()}`
                    await EmailTempModel.findOne({ "name": "reverification" }).then(temp => {

                        let dataToReplace = {
                            username: getadmin.name,
                            link: verificationLink,
                        }
                        let newTemp = nommoc.UpdateTemplate(temp, dataToReplace)
                        SendSMail(newTemp.body, newTemp.subject, [getadmin.email]);
                        res.json({ "status": false, "message": "Your account verification  is pending. Please verify your account to login.!!!" });
                    }).catch(err => {
                        res.json({ "status": false, "message": "There was an issue sending the verification email.!!!" });
                    })

                } else if (getadmin && getadmin.isAccountBlocked === false && data.type === 'shivaAds' && getadmin.type === 'shivaAds') {

                    let payload = createPayloadforAll(encrypt(getadmin._id.toString()+"#"+ getadmin.type), jwtTokenSuperAdminShivaAdds, 8 * 60 * 60);
                    if (getadmin.isNewLogin == null) {
                        getadmin.isNewLogin = true
                        getadmin.save()
                    } else if (getadmin.isNewLogin == true) {
                        getadmin.isNewLogin = false
                        getadmin.save()
                    }
                    res.json({
                        "status": true,
                        "message": "Logged in successfully",
                        "name": getadmin.name,

                        "token": payload
                    });
                } else if (getadmin && getadmin.isAccountBlocked === false && data.type === 's2Medias' && getadmin.type === 's2Medias') {

                    let payload = createPayloadforAll(encrypt(getadmin._id.toString() + getadmin.type), jwtTokenSuperAdminS2Media, 8 * 60 * 60);

                    if (getadmin.isNewLogin == null) {
                        getadmin.isNewLogin = true
                        getadmin.save()
                    } else if (getadmin.isNewLogin == true) {
                        getadmin.isNewLogin = false
                        getadmin.save()
                    }
                    res.json({
                        "status": true,
                        "message": "Logged in successfully",
                        "name": getadmin.name,
                        "token": payload
                    });
                } else if (getadmin && getadmin.isAccountBlocked === true) {
                    res.json({ "status": false, "message": "Your account has been blocked.!!!" });
                } else {
                    res.json({ "status": false, "message": "Invalid login credentials.!!!" });
                }
            })
            .catch((error) => {

                res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
            });
    } catch (e) {

        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        let { email } = req.body;
        const dbUser = await admin.findOne({ email: email });
        if (dbUser) {
            let token = generateToken(dbUser._id.toString(), 15)
            let verificationLink = `${forgotPassAuthURL}${token}/${dbUser.type}`
            await EmailTempModel.findOne({ "name": "forgot_password" }).then(async (temp) => {

                let dataToReplace = {
                    username: dbUser.name,
                    link: verificationLink,
                }
                let newTemp = nommoc.UpdateTemplate(temp, dataToReplace)
                const template = newTemp.body, subject = newTemp.subject, mail = [dbUser.email]

                //console.log(newTemp.body, newTemp.subject, [dbUser.email])
                await SendSMail(template, subject, mail).then((success) => {
                    res.json({ "status": true, "message": `Reset password link has been sent successfully to your email address` });

                }).catch((e) => {
                    res.json({ "status": false, "message": "There was an issue sending the verification email.!!!" });
                })
            }).catch(err => {
                console.log(err)
                res.json({ "status": false, "message": "There was an issue in finding email template.!!!" });
            })



        } else {
            res.json({ status: false, message: 'Error resetting password. User not found' });
        }
    } catch (err) {
        console.log(err);
        res.json({ "status": false, "message": "Unexpected error while processing the request" });
    }
};

exports.verifyForgotPassword = async (req, res) => {
    try {
        let { token, password, confirmPassword } = req.body
        if (password !== confirmPassword) {
            return res.json({ "status": false, "message": "Confirm password does not match" })
        }
        let dcToken = verifyToken(token)
        //console.log(  dcToken , Date.now() ,dcToken.exp > Date.now())
        if (!dcToken || dcToken.exp < Date.now() / 1000) {
            return res.json({ "status": false, message: 'The link has been expired .!!!' });
        }
        let adminId = dcToken.subject
        let newPwd = encrypt(password);
        const user = await admin.findOneAndUpdate(
            { "_id": adminId },
            { password: newPwd, $set: { isAccountVerified: true } },
            { new: true }
        );
        if (!user) {
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
        }

        return res.json({ "status": true, message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error verifying account:', error);
        return res.json({ message: 'Internal server error' });
    }
}


//====================================== Email templates ======================================================

exports.addRecords = async (req, res) => {

    try {
        const { name, subject, body } = req.body;
        const newTemplate = new EmailTempModel({ name, subject, body });
        const savedTemplate = await newTemplate.save();
        if (!savedTemplate) {
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
        }
        return res.json({ "status": true, message: 'Added successfully.' });
    } catch (error) {
        console.error('Error verifying account:', error);
        return res.json({ "status": false, "message": error.message });
    }
}

exports.findRecord = async (req, res) => {
    try {
        const data = req.body;
        const savedTemplate = await EmailTempModel.find(data);
        if (!savedTemplate) {
            return res.json({ "status": false, message: 'The record does not exist.!!!' });
        }
        return res.json({ "status": true, data: savedTemplate });
    } catch (error) {
        console.error('Error verifying account:', error);
        return res.json({ message: 'Internal server error' });
    }
}


//====================================== Contact Types ======================================================

exports.addContactType = async (req, res) => {

    try {
        const { name } = req.body;
       
        const exContactType = await ContactTypeModel.findOne({name});
        if (exContactType) {
            return res.json({ "status": false, message: 'Contact Type already exists .!!!' });
        }
        const newContactType = new ContactTypeModel({ name });
        const savedContactType = await newContactType.save();
        if (!savedContactType) {
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
        }
        return res.json({ "status": true, message: 'Added successfully.' });
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.ListOfContactType = async (req, res) => {
    try {
        
        const savedContactType = await ContactTypeModel.find().select("name");
        if (!savedContactType) {
            return res.json({ "status": false, message: 'The record does not exist.!!!' });
        }
        return res.json({ "status": true, data: savedContactType });
    } catch (error) {
        
        return res.json({ message: 'Internal server error' });
    }
}



//====================================== Designation ======================================================

exports.addDesignation = async (req, res) => {

    try {
        const { name } = req.body;
       
        const exDesignation = await DesignationModel.findOne({name});
        if (exDesignation) {
            return res.json({ "status": false, message: 'Contact Type already exists .!!!' });
        }
        const newDesignation = new DesignationModel({ name });
        const savedDesignation = await newDesignation.save();
        if (!savedDesignation) {
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
        }
        return res.json({ "status": true, message: 'Added successfully.' });
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.ListOfDesignation = async (req, res) => {
    try {
        
        const savedDesignation = await DesignationModel.find().select("name");
        if (!savedDesignation) {
            return res.json({ "status": false, message: 'The record does not exist.!!!' });
        }
        return res.json({ "status": true, data: savedDesignation });
    } catch (error) {
        
        return res.json({ message: 'Internal server error' });
    }
}



//====================================== News Paper ======================================================

exports.addNewsPaper = async (req, res) => {

    try {
        const { name } = req.body;
       
        const exNewsPaper = await NewsPaperModel.findOne({name});
        if (exNewsPaper) {
            return res.json({ "status": false, message: 'News Paper name already exists .!!!' });
        }
        const newNewsPaper = new NewsPaperModel({ name });
        const savedNewsPaper = await newNewsPaper.save();
        if (!savedNewsPaper) {
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
        }
        return res.json({ "status": true, message: 'Added successfully.' });
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.updateNewsPaper = async (req, res) => {

    try {
        const { _id, name } = req.body;
       
        const exNewsPaper = await NewsPaperModel.findByIdAndUpdate(_id,{name});
        if (exNewsPaper) {
            return res.json({ "status": false, message: 'News Paper name updated successfully .!!!' });
        }
      
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
     
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.deleteNewsPaper = async (req, res) => {

    try {
        const { id } = req.params;
       
        const exNewsPaper = await NewsPaperModel.findByIdAndDelete(id);
        if (exNewsPaper) {
            return res.json({ "status": false, message: 'News Paper deleted successfully .!!!' });
        }
      
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
     
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.ListOfNewsPaper = async (req, res) => {
    try {
        
        const savedNewsPaper = await NewsPaperModel.find().select("name");
        if (!savedNewsPaper) {
            return res.json({ "status": false, message: 'The record does not exist.!!!' });
        }
        return res.json({ "status": true, data: savedNewsPaper });
    } catch (error) {
        
        return res.json({ message: 'Internal server error' });
    }
}


//====================================== News Paper Center  ======================================================

exports.addNewsPaperCenter = async (req, res) => {

    try {
        const { name } = req.body;
       
        const exNewsPaperCenter = await NewsPaperCenterModel.findOne({name});
        if (exNewsPaperCenter) {
            return res.json({ "status": false, message: 'News Paper Center name already exists .!!!' });
        }
        const newNewsPaperCenter = new NewsPaperCenterModel({ name });
        const savedNewsPaperCenter = await newNewsPaperCenter.save();
        if (!savedNewsPaperCenter) {
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
        }
        return res.json({ "status": true, message: 'Center Added successfully.' });
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.updateNewsPaperCenter = async (req, res) => {

    try {
        const { _id, name } = req.body;
       
        const exNewsPaperCenter = await NewsPaperCenterModel.findByIdAndUpdate(_id,{name});
        if (exNewsPaperCenter) {
            return res.json({ "status": false, message: 'News Paper Center name updated successfully .!!!' });
        }
      
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
     
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.deleteNewsPaperCenter = async (req, res) => {

    try {
        const { id } = req.params;
       
        const exNewsPaperCenter = await NewsPaperCenterModel.findByIdAndDelete(id);
        if (exNewsPaperCenter) {
            return res.json({ "status": false, message: 'News Paper Center deleted successfully .!!!' });
        }
      
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
     
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.ListOfNewsPaperCenter = async (req, res) => {
    try {
        
        const savedNewsPaperCenter = await NewsPaperCenterModel.find().select("name");
        if (!savedNewsPaperCenter) {
            return res.json({ "status": false, message: 'The record does not exist.!!!' });
        }
        return res.json({ "status": true, data: savedNewsPaperCenter });
    } catch (error) {
        
        return res.json({ message: 'Internal server error' });
    }
}



//====================================== Discount Category ======================================================

exports.addDiscountCategory = async (req, res) => {

    try {
        const { name } = req.body;
       
        const exDiscountCategory = await DiscountCategoryModel.findOne({name});
        if (exDiscountCategory) {
            return res.json({ "status": false, message: 'Discount Category already exists .!!!' });
        }
        const newDiscountCategory = new DiscountCategoryModel({ name });
        const savedDiscountCategory = await newDiscountCategory.save();
        if (!savedDiscountCategory) {
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
        }
        return res.json({ "status": true, message: 'Discount Category Added successfully.' });
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.updateDiscountCategory = async (req, res) => {

    try {
        const { _id, name } = req.body;
       
        const exDiscountCategory = await DiscountCategoryModel.findByIdAndUpdate(_id,{name});
        if (exDiscountCategory) {
            return res.json({ "status": false, message: 'Discount Category updated successfully .!!!' });
        }
      
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
     
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.deleteDiscountCategory = async (req, res) => {

    try {
        const { id } = req.params;
       
        const exDiscountCategory = await DiscountCategoryModel.findByIdAndDelete(id);
        if (exDiscountCategory) {
            return res.json({ "status": false, message: 'Discount Category deleted successfully .!!!' });
        }
      
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
     
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.ListOfDiscountCategory = async (req, res) => {
    try {
        
        const savedDiscountCategory = await DiscountCategoryModel.find().select("name");
        if (!savedDiscountCategory) {
            return res.json({ "status": false, message: 'The record does not exist.!!!' });
        }
        return res.json({ "status": true, data: savedDiscountCategory });
    } catch (error) {
        
        return res.json({ message: 'Internal server error' });
    }
}



//====================================== Notice Type  ======================================================

exports.addNoticeType = async (req, res) => {

    try {
        const { name } = req.body;
       
        const exNoticeType = await NoticeTypeModel.findOne({name});
        if (exNoticeType) {
            return res.json({ "status": false, message: 'Notice Type already exists .!!!' });
        }
        const newNoticeType = new NoticeTypeModel({ name });
        const savedNoticeType = await newNoticeType.save();
        if (!savedNoticeType) {
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
        }
        return res.json({ "status": true, message: 'Notice Type Added successfully.' });
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.updateNoticeType = async (req, res) => {

    try {
        const { _id, name } = req.body;
       
        const exNoticeType = await NoticeTypeModel.findByIdAndUpdate(_id,{name});
        if (exNoticeType) {
            return res.json({ "status": false, message: 'Notice Type updated successfully .!!!' });
        }
      
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
     
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.deleteNoticeType = async (req, res) => {

    try {
        const { id } = req.params;
       
        const exNoticeType = await NoticeTypeModel.findByIdAndDelete(id);
        if (exNoticeType) {
            return res.json({ "status": false, message: 'Notice Type deleted successfully .!!!' });
        }
      
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
     
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.ListOfNoticeType = async (req, res) => {
    try {
        
        const savedNoticeType = await NoticeTypeModel.find().select("name");
        if (!savedNoticeType) {
            return res.json({ "status": false, message: 'The record does not exist.!!!' });
        }
        return res.json({ "status": true, data: savedNoticeType });
    } catch (error) {
        
        return res.json({ message: 'Internal server error' });
    }
}



//====================================== GST %  ======================================================

exports.addGST = async (req, res) => {

    try {
        const { percent } = req.body;
       
        const exGST = await GSTModel.findOne({percent});
        if (exGST) {
            return res.json({ "status": false, message: 'GST % already exists .!!!' });
        }
        const newGST = new GSTModel({ percent });
        const savedGST = await newGST.save();
        if (!savedGST) {
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
        }
        return res.json({ "status": true, message: 'GST % Added successfully.' });
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.updateGST = async (req, res) => {

    try {
        const { _id, percent } = req.body;
       
        const exGST = await GSTModel.findByIdAndUpdate(_id,{percent});
        if (exGST) {
            return res.json({ "status": false, message: 'GST % updated successfully .!!!' });
        }
      
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
     
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.deleteGST = async (req, res) => {

    try {
        const { id } = req.params;
       
        const exGST = await GSTModel.findByIdAndDelete(id);
        if (exGST) {
            return res.json({ "status": false, message: 'GST % deleted successfully .!!!' });
        }
      
            return res.json({ "status": false, message: 'Something went wrong.!!!' });
     
    } catch (error) {
    
        return res.json({ "status": false, "message": error.message });
    }
}

exports.ListOfGSTs = async (req, res) => {
    try {
        
        const savedGST = await GSTModel.find().select("percent");
        if (!savedGST) {
            return res.json({ "status": false, message: 'The record does not exist.!!!' });
        }
        return res.json({ "status": true, data: savedGST });
    } catch (error) {
        
        return res.json({ message: 'Internal server error' });
    }
}
