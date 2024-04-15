const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const config = require("../nodedetails/config");
const nommoc = require("./nommoc");
const key_data = CryptoJS.enc.Base64.parse(config.cryptoKey);
const iv_data = CryptoJS.enc.Base64.parse(config.cryptoIv);
// const jwtTokenSuperAdmin = config.jwtTokenSuperAdmin;
// const jwtTokenAdmin = config.jwtTokenAdmin;
const jwtTokenSuperAdminShivaAdds = config.jwtTokenSuperAdminShivaAdds;
const jwtTokenSuperAdminS2Media = config.jwtTokenSuperAdminS2Media;

exports.encrypt = (value) => {
  const cipher = CryptoJS.AES.encrypt(value, key_data, { iv: iv_data }).toString();
  return cipher;
};

exports.decrypt = (value) => {
  const decipher = CryptoJS.AES.decrypt(value, key_data, { iv: iv_data });
  const decrypt_val = decipher.toString(CryptoJS.enc.Utf8);
  return decrypt_val;
};

const decrypt = exports.decrypt = (value) => {
  const decipher = CryptoJS.AES.decrypt(value, key_data, { iv: iv_data });
  const decrypt_val = decipher.toString(CryptoJS.enc.Utf8);
  return decrypt_val;
};
//=================================================== Admin ====================================================

// exports.createPayloadSuperAdmin = (value) => {
//   const payload = { subject: value };
//   const token = jwt.sign(payload, jwtTokenSuperAdmin, { "expiresIn": "60m" });
//   return token;
// }
// exports.createPayloadAdmin = (value) => {
//   const payload = { subject: value };
//   const token = jwt.sign(payload, jwtTokenAdmin, { "expiresIn": "120m" });
//   return token;
// }

exports.createPayloadforAll = (value, secret, expiresIn) => {
  const payload = { subject: value };
  const token = jwt.sign(payload, secret, { "expiresIn": expiresIn });
  return token;
}

exports.generateToken = (value, expireIn) => {
  const payload = { subject: value };
  const token = jwt.sign(payload, "forgot_password", { "expiresIn": `${expireIn}m` });
  return token;
}
exports.verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, "forgot_password");
    return payload;
  } catch (error) {
    return null;
  }
}

exports.tokenMiddleVerify = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (token != null) {
      jwt.verify(token, jwtTokenSuperAdminShivaAdds, (err, payload) => {
        if (payload) {
          const decPayload = decrypt(payload.subject)
          const splitData = decPayload.split("#");
          const userId = splitData[0]
          const credentialType = splitData[1];
          req.userId = userId;
          req.credentialType = credentialType;
          next();
        } else {
          jwt.verify(token, jwtTokenSuperAdminS2Media, (err, adminPayload) => {
            if (adminPayload) {
              const decPayload = decrypt(adminPayload.subject)
              const splitData = decPayload.split("#");
              const userId = splitData[0]
              const credentialType = splitData[1];
              req.userId = userId;
              req.credentialType = credentialType;
            } else {
              res.json({ "status": false, "message": "Token Expied" });
            }
          });
        }
      });
    } else {
      res.json({ "status": false, "message": "Unauthorized2" });
    }
  } else {
    res.json({ "status": false, "message": "Unauthorized3" });
  }
};