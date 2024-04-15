
const common = require("../common/nommoc");

module.exports = { 
    
    dbConnection: "mongodb+srv://PGCortex:E2yvv3FaZ723difg@ppcluster1.llw9kld.mongodb.net/Shiva_Adds",
    port: 4000,
    serverType: "http",
    dbPrefix : common.decrypt("e90c4ae03a04"),
    cryptoKey: common.decrypt("e90c6ae01a3ac656ed63d8a910b2d4f40c569f412323999efd415745d4583447"),
    cryptoIv: common.decrypt("e90c6ae01a3ac656ed63d8a910b2f4d4"),
    jwtTokenSuperAdminShivaAdds: common.decrypt("e9541bdf6969c3028f46a7f410b288e1582aac212256e69b85315225a8594b7b"),
    jwtTokenSuperAdminS2Media: common.decrypt("e9566ea66e1fb20bff51a4fc13b08ce3582eba20275be69b9c30573ba959447a"),
    mailVerificationURL:"https://dev.s2medias.com/verify_account/",
    forgotPassAuthURL:"https://dev.s2medias.com/auth_token/",

    //Shiva Ads SES credentials  
    shivaAdsAWS_SES: {
        secretAccessKey:"BETniYVUfOBLoirnlrQpv2p8meqz15eeximqhuIL",
        accessKeyId:"AKIA3FLDZZEEITOC24G7",
        region: "ap-south-1"
    },
    shivaAdsAWS_S3: {
        secretAccessKey:"KmFh/GcHjMDbnwfxTwvNq5yMhP8EVc84ngiWOfmT",
        accessKeyId:"AKIA3FLDZZEEA2CMDFNF",
        region: "us-east-1",
        bucket:"generalasset",
        transDocBucket:"transactiondocumentsassets"
    },
    awsOptionsfiles: {
        secretAccessKey:"",
        accessKeyId:"",
        Bucket:"",
        region: ''
    },
};

