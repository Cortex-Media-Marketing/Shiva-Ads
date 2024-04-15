const aws = require('aws-sdk');
const config = require("../nodedetails/config");
const s3 = new aws.S3(config.shivaAdsAWS_S3);
aws.config.update(config.shivaAdsAWS_SES);
const aws_SES = new aws.SES();

exports.SendSMail = async (template, subject, listOfEmails) => {

  const params = {
    Destination: {
      ToAddresses: listOfEmails,
    },
    Message: {
      Body: {
        Html: {
          Data: template,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: 'Shiva Adds <pankaj@cortexmarketing.in>',
   
  };

  // Send the email
  aws_SES.sendEmail(params, (err, data) => {
    if (err) {
      console.error('Error sending email:', err);

      if (err.code === 'MessageRejected') {
        console.log('Message rejected:', err.message);

      } else {

        console.error('Other error:', err.message);
      }
    }
    //  else {
    //   console.log('Email sent successfully');
    // }
  });

}


exports.fileUpload = async (file, callback) => {
  try {
    if (file != undefined && typeof file != 'undefined') {

      //let splits = file.originalname.split('.');
      //console.log(splits)
      const params = {
        Bucket: config.shivaAdsAWS_S3.bucket,
        Key:  Date.now().toString() + "_" + file.originalname,
        Body: file.buffer,
        ACL: 'public-read'
      }
      //console.log(params,"para")
      s3.upload(params, (err, data) => {
        if (err) {
          callback({ "status": false, "error": err });
        } else {
          callback({ "status": true, "url": data.Location });
        }
      });
    } else {
      callback({ "status": false });
    }
  } catch (err) {
    console.log("Error catched in file upload", err)
    callback({ "status": false });
  }
}
