const onScrnTheater = require("../models/onScreenRo");
const offScrnTheater = require("../models/offScreenRo");
const config = require("../nodedetails/config");
const axios = require('axios');
const s3Data = config.shivaAdsAWS_S3
const awsHelper = require("../common/aws")
const helper = require("../common/nommoc")
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: 'AKIA3FLDZZEEA2CMDFNF',
    secretAccessKey: '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',
    region: 'us-east-1'
  });

  const ses = new AWS.SES({ 
    secretAccessKey:"qUHkU1ixZml1Bg2DmYCBKccP9qOyW8WOPjcCeJBV",
    accessKeyId:"AKIA3FLDZZEELHUS6JTK",
    region: "ap-south-1"
})
const puppeteer = require('puppeteer');
const fs = require('fs');

exports.crtThrOnScrnRo = async (req, res) => {
    try {
        const roNum = await helper.GenerateRoNumber();
        const data = req.body;
        data["roNumber"] = roNum
        const creatRec = await onScrnTheater.create(data);
        if (creatRec) {
            const incRoNum = await helper.IncRoNumber();
            if (incRoNum.acknowledged) {
                res.json({ status: true, messag: "Record Created Successfully" })
            } else {
                res.json({ status: true, messag: "Record Created Successfully but failed to update Ro number" })
            }
        } else {
            res.json({ status: false, message: "Unable to create record" })
        }

    } catch (e) {
        console.log(e, "err");
        res.json({ status: false, message: "oops something went wrong" })

    }

}

exports.editThrOnScrRo = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id
        const updateRec = await onScrnTheater.findByIdAndUpdate({ _id: id }, data);
        if (updateRec) {
            res.json({ status: true, messag: "Record updated Successfully" })
        } else {
            res.json({ status: false, message: "Unable to update record" })
        }
    } catch {
        console.log(e, "err")
        res.json({ status: false, message: "oops something went wrong" })
    }
}

exports.listThrOnScrRo = async (req, res) => {
    try {
        const findRec = await onScrnTheater.find();
        if (findRec) {
            res.json({ status: true, messag: "Record fetched Successfully", data: findRec })
        } else {
            res.json({ status: false, message: "Unable to fetch record" })
        }
    } catch {
        console.log(e, "err")
        res.json({ status: false, message: "oops something went wrong" })
    }
}

exports.fetchonScrnTheaterROGenerated = (req, res) => {
  try {
      let data = req.params;

      onScrnTheater.findById(data.id)
      .select("roNumber isRoGenerated roUrl")
          .then((exonScrnTheater) => {

              return res.json({ "status": true, "data": exonScrnTheater });

          }).catch((error) => {
              return res.json({ "status": false, "message": error.message });
          });
  } catch (e) {
      console.error(e)
      return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
  }
};



exports.delThrOnScrRo = async (req, res) => {
    try {
        const id = req.params.id
        const delRec = await onScrnTheater.findByIdAndDelete({ "_id": id });
        if (delRec) {
            res.json({ status: true, messag: "Record deleted Successfully" })
        } else {
            res.json({ status: false, message: "Unable to fetch record" })
        }
    } catch {
        console.log(e, "err")
        res.json({ status: false, message: "oops something went wrong" })
    }
}

exports.crtThrOffScrnRo = async (req, res) => {
    try {

        const roNum = await helper.GenerateRoNumber();
        const data = req.body;
        data["roNumber"] = roNum

        const creatRec = await offScrnTheater.create(data);
        if (creatRec) {
            const incRoNum = await helper.IncRoNumber();
            if (incRoNum.acknowledged) {
                res.json({ status: true, messag: "Record Created Successfully" })
            } else {
                res.json({ status: true, messag: "Record Created Successfully but failed to update Ro number" })
            }
        } else {
            res.json({ status: false, message: "Unable to create record" })
        }


    } catch (e) {
        console.log(e, "err")
        res.json({ status: false, message: "oops something went wrong" })
    }

}

exports.editThrOffScrRo = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id
        const updateRec = await offScrnTheater.findByIdAndUpdate({ _id: id }, data);
        if (updateRec) {
            res.json({ status: true, messag: "Record updated Successfully" })
        } else {
            res.json({ status: false, message: "Unable to update record" })
        }
    } catch {
        console.log(e, "err")
        res.json({ status: false, message: "oops something went wrong" })
    }
}

exports.listThrOffScrRo = async (req, res) => {
    try {
        const findRec = await offScrnTheater.find();
        if (findRec) {
            res.json({ status: true, messag: "Record fetched Successfully", data: findRec })
        } else {
            res.json({ status: false, message: "Unable to fetch record" })
        }
    } catch {
        console.log(e, "err")
        res.json({ status: false, message: "oops something went wrong" })
    }
}

exports.fetchoffScrnTheaterROGenerated = (req, res) => {
  try {
      let data = req.params;

      offScrnTheater.findById(data.id)
      .select("roNumber isRoGenerated roUrl")
          .then((exoffScrnTheater) => {

              return res.json({ "status": true, "data": exoffScrnTheater });

          }).catch((error) => {
              return res.json({ "status": false, "message": error.message });
          });
  } catch (e) {
      console.error(e)
      return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
  }
};






































    //for 2 pages

  //   async function htmlToPdf(htmlString, outputPath) {
  //     const browser = await puppeteer.launch();
  //     const page = await browser.newPage();
  
  //     // Set the viewport size to fit the entire content without scrolling
  //     await page.setViewport({
  //         width: 1200, // Adjust the width as needed
  //         height: 800, // Adjust the height as needed
  //         deviceScaleFactor: 1,
  //     });
  
  //     // Set custom margins and page size
  //     await page.pdf({
  //         path: outputPath,
  //         format: 'Letter', // Use a custom page size (e.g., Letter)
  //         printBackground: true,
  //         margin: {
  //             top: '10mm',    // Adjust top margin as needed
  //             bottom: '10mm', // Adjust bottom margin as needed
  //             left: '10mm',   // Adjust left margin as needed
  //             right: '10mm',  // Adjust right margin as needed
  //         },
  //         displayHeaderFooter: false,
  //     });
  
  //     await page.setContent(htmlString);
  
  //     // Generate PDF from the page content
  //     await page.pdf({
  //         path: outputPath,
  //         format: 'Letter', // Use a custom page size (e.g., Letter)
  //         printBackground: true,
  //         margin: {
  //             top: '10mm',    // Adjust top margin as needed
  //             bottom: '10mm', // Adjust bottom margin as needed
  //             left: '10mm',   // Adjust left margin as needed
  //             right: '10mm',  // Adjust right margin as needed
  //         },
  //     });
  
  //     await browser.close();
  // }
    

// working only for pdf 

// exports.sendMailWithAtt  = async(req,res) =>{  
//     try {

//       //sample response for attachment
//       //const fileAttachment = [{fileUrl:"https://generalasset.s3.amazonaws.com/Invoice_1616529341.pdf",fileName:"invoice.pdf"},{fileUrl:"https://generalasset.s3.amazonaws.com/Invoice_1616529341.pdf",fileName:"invoice.pdf"},{fileUrl:"https://generalasset.s3.amazonaws.com/Invoice_1616529341.pdf",fileName:"invoice.pdf"}]
      
//       const {fileAttachment,receiverMailId,mailSubject} = req.body

//       const createMultiAttRaw = await fileAttachment.map(async (item,i)=>{
//         const response = await axios.get(item.fileUrl, {
//           responseType: 'arraybuffer'
//         });
    
//         const attachmentContent = Buffer.from(response.data, 'binary').toString('base64');
//         return (
//           `--NextPart\n` +
//           `Content-Type: application/octet-stream; name="${item.fileName}"\n` +
//           `Content-Disposition: attachment; filename="${item.fileName}"\n` +
//           `Content-Transfer-Encoding: base64\n\n` +
//           `${attachmentContent}\n\n`
//         );
        
//       })
      
//       const finResp  = await Promise.all(createMultiAttRaw) 
//       const attachmentsData = finResp.join('');

//        const emailResponse = await sendEmailWithAttachment(receiverMailId, mailSubject,  attachmentsData);
//       console.log('Email sent successfully:', emailResponse);
//       res.json({status:true,message:"Email sent successfully",emailResponse})
//     } catch (err) {
//       res.json({status:false,message:"Failed to send mail",emailResponse})

//       console.error('Error sending email:', err);
//     }
// }

// async function sendEmailWithAttachment(to, subject,  attachmentContent) {
//   const rawEmail = await createRawEmail(to, subject,  attachmentContent);
//   const params = {
//     Source: "pankaj@cortexmarketing.in",
//     Destinations: ["gokul@cortexmarketing.in"],
//     RawMessage: {
//       Data: rawEmail
//     }
//   };

//   return ses.sendRawEmail(params).promise();
// }

// function createRawEmail(to, subject,  attachmentContent) {
// const rawEmail = `From: pankaj@cortexmarketing.in\n` +
// `To: gokul@cortexmarketing.in\n` +
// `Subject: ${subject}\n` +
// `MIME-Version: 1.0\n` +
// `Content-Type: multipart/mixed; boundary="NextPart"\n\n` +
// `--NextPart\n` +
// `Content-Type: text/plain\n\n` +
// `Hello,\n\n` +
// `Please find the attached files.\n\n` +
// `${attachmentContent}` + 
//  `--NextPart--`

// return rawEmail;

// }







































































//working code for single attachment

// exports.pdfFormat  = async(req,res) =>{


//   async function sendEmailWithAttachment(to, subject, attachmentFileName, attachmentContent) {
//     const rawEmail = await createRawEmail(to, subject, attachmentFileName, attachmentContent);
//     const params = {
//       Source: "pankaj@cortexmarketing.in",
//       Destinations: ["gokul@cortexmarketing.in"],
//       RawMessage: {
//         Data: rawEmail
//       }
//     };
  
//     return ses.sendRawEmail(params).promise();
//   }
  
//   async function createRawEmail(to, subject, attachmentFileName, attachmentContent) {
//   const rawEmail = `From: pankaj@cortexmarketing.in\n` +
//   `To: gokul@cortexmarketing.in\n` +
//   `Subject: ${"subject"}\n` +
//   `MIME-Version: 1.0\n` +
//   `Content-Type: multipart/mixed; boundary="NextPart"\n\n` +
//   `--NextPart\n` +
//   `Content-Type: text/plain\n\n` +
//   `Hello,\n\n` +
//   `Please find the attached files.\n\n` +
//   `--NextPart\n` +
//   `Content-Type: application/octet-stream; name="${attachmentFileName}"\n` +
//   `Content-Disposition: attachment; filename="${attachmentFileName}"\n` +
//   `Content-Transfer-Encoding: base64\n\n` +
//   `${attachmentContent}\n\n`+
//   `--NextPart--`
  

//   return rawEmail;
  
//   }
  
//     try {

//       const response = await axios.get('https://generalasset.s3.amazonaws.com/Invoice_1616529341.pdf', {
//         responseType: 'arraybuffer'
//       });
  
//       const attachmentContent = Buffer.from(response.data, 'binary').toString('base64');
  
//       const emailResponse = await sendEmailWithAttachment('gokul@cortexmarketing.in', 'Invoice Attached', 'invoice.pdf', attachmentContent);
  
//       console.log('Email sent successfully:', emailResponse);
//     } catch (err) {
//       console.error('Error sending email:', err);
//     }

// }

  // async function sendEmailWithAttachment(email, subject, attachmentFileName, attachmentContent) {
  //   const params = {
  //     RawMessage: {
  //       Data: await createRawEmail(email, subject, attachmentFileName, attachmentContent)
  //     }
  //   };
  // console.log(createRawEmail(email, subject, attachmentFileName, attachmentContent),"raw")
  //   return ses.sendRawEmail(params).promise();
  // }
  // async function createRawEmail(email, subject, attachmentFileName, attachmentContent) {
  //   const boundary = `BOUNDARY_${Date.now()}`;
  //   const rawEmail = `From: pankaj@cortexmarketing.in
  // To: ${email}
  // Subject: ${subject}
  // MIME-Version: 1.0
  // Content-type: multipart/mixed; boundary="${boundary}"
  
  // --${boundary}
  // Content-Type: text/plain; charset=UTF-8
  
  // Please find the attached invoice.
  
  // --${boundary}
  // Content-Type: application/pdf
  // Content-Disposition: attachment; filename="${attachmentFileName}"
  
  // ${attachmentContent}
  
  // --${boundary}--`;
  
  //   return rawEmail;
  // }
  // (async () => {
  //   try {
  //     // Download the PDF content from the S3 URL
  //     const response = await axios.get('https://generalasset.s3.amazonaws.com/Invoice_1616529341.pdf', {
  //       responseType: 'arraybuffer'
  //     });
  
  //     // Convert the binary content to base64 encoding
  //     const attachmentContent = Buffer.from(response.data, 'binary').toString('base64');
  
  //     const emailResponse = await sendEmailWithAttachment('gokul@cortexmarketing.in', 'Invoice Attached', 'invoice.pdf', attachmentContent);
  
  //     console.log('Email sent successfully:', emailResponse);
  //   } catch (err) {
  //     console.error('Error sending email:', err);
  //   }
  // })();


 // const rawEmailMessage = {
        //   Source: fromMail,
        //   Destinations: [toMail],
        //   RawMessage: {
        //     Data: `From: ${fromMail}\n` +
        //           `To: ${toMail}\n` +
        //           `Subject: ${subject}\n` +
        //           `MIME-Version: 1.0\n` +
        //           `Content-Type: multipart/mixed; boundary="NextPart"\n\n` +
        //           `--NextPart\n` +
        //           `Content-Type: text/plain\n\n` +
        //           `Hello,\n\n` +
        //           `Please find the attached files.\n\n` +
        //           `--NextPart\n` +
        //           `Content-Type: application/octet-stream; name="${fileName}"\n` +
        //           `Content-Disposition: attachment; filename="${fileName}"\n` +
        //           `Content-Transfer-Encoding: base64\n\n` +
        //           `${attachmentBase641}\n\n` +
        //           `--NextPart\n` +
        //           `Content-Type: application/octet-stream; name="${fileName}"\n` +
        //           `Content-Disposition: attachment; filename="${fileName}"\n` +
        //           `Content-Transfer-Encoding: base64\n\n` +
        //           `${attachmentBase641}\n\n` +
        //           `--NextPart--`
        //   }
        // };