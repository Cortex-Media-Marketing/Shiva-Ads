
const common = require("../common/nommoc");

module.exports = { 
    
    dbConnection: common.decrypt("d70b4df1343fe019cd70e0f76cafe9f62b708c65766aedeafe791003ab2e644a2d706055628a311f8a883cba9a20c4f31b8b0fee2123f3861ea8bc8df5078a0782c1f39a616d85ad27557390068d0f5cd3"),
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
        secretAccessKey:common.decrypt("f82177f83202d467d84dd4812ce9cbdf046daf616520a797a165170fa95d6075622b3e4063991f13"),
        accessKeyId:common.decrypt("fb2f6ad7681dce76e458d3880ad4f6f25a2bb926"),
        region: common.decrypt("db140ee5342ef65a9333"),
        email:common.decrypt("dd0b48e3371be15dcc76f3b52ee1cbda0d6b977f743cbec1"),
    },
    shivaAdsAWS_S3: {
        secretAccessKey:common.decrypt("f10965fe741ce17ad44fd2af2df7dfc93c68885f6227aee2a4505e30ce0b3d2474253a66448a3b0b"),
        accessKeyId:common.decrypt("fb2f6ad7681dce76e458d38802b2fafc2c59b057"),
        region: common.decrypt("cf170ef33a28f61f8f"),
        bucket:common.decrypt("dd014df3293aee53cd71f3b9"),
        transDocBucket:common.decrypt("ce1642f8283ae146d76df8a92ce3ccdc0d718a627261a4cab873"),
    },
    awsOptionsfiles: {
        secretAccessKey:"",
        accessKeyId:"",
        Bucket:"",
        region: ''
    },
};

