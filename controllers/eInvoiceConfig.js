const axios = require('axios');
var QRCode = require('qrcode')
const config = require("../nodedetails/config");
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: config.shivaAdsAWS_S3.accessKeyId,
    secretAccessKey: config.shivaAdsAWS_S3.secretAccessKey,
    region: config.shivaAdsAWS_S3.region
  });

  const ses = new AWS.SES({ 
    secretAccessKey:config.shivaAdsAWS_SES.secretAccessKey,
    accessKeyId:config.shivaAdsAWS_SES.accessKeyId,
    region: config.shivaAdsAWS_SES.region
})

const puppeteer = require('puppeteer');
const fs = require('fs');

exports.createEinvoice =async (req, res) => {



          var email="s2mediasslm@gmail.com";
          var Token="";
          var tokenExpiry="";
          const HEADER = {
            headers: { 
            "username" :"mastergst",
            "password" :"Malli#123",
            "ip_address" :"49.37.211.197",
            "client_id" :"6d9a2d65-d6bc-438b-b165-f21e622bc9a5",
            "client_secret" :"2cb9ec36-b73d-4198-8532-42535bb05706",
            "gstin" :"29AABCT1332L000"
           }
          }
          
          
          axios.get('https://api.mastergst.com/einvoice/authenticate?email='+email, HEADER)
          .then(async (response) =>  {
            if(response.data.status_cd=="Sucess"){
              Token=response.data.data.AuthToken;
              tokenExpiry=response.data.data.TokenExpiry;
              console.log(Token,"tokeeeeen");
              

            const DATA = {
                "Version": "1.1",
                "TranDtls": {
                  "TaxSch": "GST",
                  "SupTyp": "B2B",
                  "RegRev": "N",
                  "EcmGstin": null,
                  "IgstOnIntra": "N"
                },
                "DocDtls": {
                  "Typ": "INV",
                  "No": "GOKUL/12",
                  "Dt": "08/04/2024"
                },
                "SellerDtls": {
                  "Gstin": "29AABCT1332L000",
                  "LglNm": "ABC company pvt ltd",
                  "TrdNm": "NIC Industries",
                  "Addr1": "5th block, kuvempu layout",
                  "Addr2": "kuvempu layout",
                  "Loc": "GANDHINAGAR",
                  "Pin": 560001,
                  "Stcd": "29",
                  "Ph": "9000000000",
                  "Em": "abc@gmail.com"
                },
                "BuyerDtls": {
                  "Gstin": "29AWGPV7107B1Z1",
                  "LglNm": "XYZ company pvt ltd",
                  "TrdNm": "XYZ Industries",
                  "Pos": "37",
                  "Addr1": "7th block, kuvempu layout",
                  "Addr2": "kuvempu layout",
                  "Loc": "GANDHINAGAR",
                  "Pin": 560004,
                  "Stcd": "29",
                  "Ph": "9000000000",
                  "Em": "abc@gmail.com"
                },
                "DispDtls": {
                  "Nm": "ABC company pvt ltd",
                  "Addr1": "7th block, kuvempu layout",
                  "Addr2": "kuvempu layout",
                  "Loc": "Banagalore",
                  "Pin": 518360,
                  "Stcd": "37"
                },
                "ShipDtls": {
                  "Gstin": "29AWGPV7107B1Z1",
                  "LglNm": "CBE company pvt ltd",
                  "TrdNm": "kuvempu layout",
                  "Addr1": "7th block, kuvempu layout",
                  "Addr2": "kuvempu layout",
                  "Loc": "Banagalore",
                  "Pin": 518360,
                  "Stcd": "37"
                },
                "ItemList": [
                  {
                    "SlNo": "1",
                    "IsServc": "N",
                    "PrdDesc": "Rice",
                    "HsnCd": "1001",
                    "Barcde": "123456",
                    "BchDtls": {
                      "Nm": "123456",
                      "Expdt": "01/08/2020",
                      "wrDt": "01/09/2020"
                    },
                    "Qty": 100.345,
                    "FreeQty": 10,
                    "Unit": "NOS",
                    "UnitPrice": 99.545,
                    "TotAmt": 9988.84,
                    "Discount": 10,
                    "PreTaxVal": 1,
                    "AssAmt": 9978.84,
                    "GstRt": 12,
                    "SgstAmt": 0,
                    "IgstAmt": 1197.46,
                    "CgstAmt": 0,
                    "CesRt": 5,
                    "CesAmt": 498.94,
                    "CesNonAdvlAmt": 10,
                    "StateCesRt": 12,
                    "StateCesAmt": 1197.46,
                    "StateCesNonAdvlAmt": 5,
                    "OthChrg": 10,
                    "TotItemVal": 12897.7,
                    "OrdLineRef": "3256",
                    "OrgCntry": "AG",
                    "PrdSlNo": "12345",
                    "AttribDtls": [
                      {
                        "Nm": "Rice",
                        "Val": "10000"
                      }
                    ]
                  }
                ],
                "ValDtls": {
                  "AssVal": 9978.84,
                  "CgstVal": 0,
                  "SgstVal": 0,
                  "IgstVal": 1197.46,
                  "CesVal": 508.94,
                  "StCesVal": 1202.46,
                  "Discount": 10,
                  "OthChrg": 20,
                  "RndOffAmt": 0.3,
                  "TotInvVal": 12908,
                  "TotInvValFc": 12897.7
                },
                "PayDtls": {
                  "Nm": "ABCDE",
                  "Accdet": "5697389713210",
                  "Mode": "Cash",
                  "Fininsbr": "SBIN11000",
                  "Payterm": "100",
                  "Payinstr": "Gift",
                  "Crtrn": "test",
                  "Dirdr": "test",
                  "Crday": 100,
                  "Paidamt": 10000,
                  "Paymtdue": 5000
                },
                "RefDtls": {
                  "InvRm": "TEST",
                  "DocPerdDtls": {
                    "InvStDt": "01/08/2020",
                    "InvEndDt": "01/09/2020"
                  },
                  "PrecDocDtls": [
                    {
                      "InvNo": "DOC/002",
                      "InvDt": "01/08/2020",
                      "OthRefNo": "123456"
                    }
                  ],
                  "ContrDtls": [
                    {
                      "RecAdvRefr": "DOC/002",
                      "RecAdvDt": "01/08/2020",
                      "Tendrefr": "Abc001",
                      "Contrrefr": "Co123",
                      "Extrefr": "Yo456",
                      "Projrefr": "Doc-456",
                      "Porefr": "Doc-789",
                      "PoRefDt": "01/08/2020"
                    }
                  ]
                },
                "AddlDocDtls": [
                  {
                    "Url": "https://einv-apisandbox.nic.in",
                    "Docs": "Test Doc",
                    "Info": "Document Test"
                  }
                ],
                "ExpDtls": {
                  "ShipBNo": "A-248",
                  "ShipBDt": "01/08/2020",
                  "Port": "INABG1",
                  "RefClm": "N",
                  "ForCur": "AED",
                  "CntCode": "AE"
                },
                "EwbDtls": {
                  "Transid": "12AWGPV7107B1Z1",
                  "Transname": "XYZ EXPORTS",
                  "Distance": 100,
                  "Transdocno": "DOC01",
                  "TransdocDt": "01/08/2020",
                  "Vehno": "ka123456",
                  "Vehtype": "R",
                  "TransMode": "1"
                }
            }
            const HEADER = {
                  headers: { 
                    "email":email,
                    "username" :"mastergst",
                    "ip_address" :"49.37.211.197",
                    "client_id" :"6d9a2d65-d6bc-438b-b165-f21e622bc9a5",
                    "client_secret" :"2cb9ec36-b73d-4198-8532-42535bb05706",
                    "gstin" :"29AABCT1332L000",
                    "auth-token":Token
            }
            } 
        
        var url='https://api.mastergst.com/einvoice/type/GENERATE/version/V1_03?email='+email;
        axios.post(url, DATA, HEADER)
        .then(async (response) => {
         console.log(response.data);
         res.json({data:response.data})
        })
        .catch((e) => {
          res.send({ status: 0, message: e });
        })
        }
        else {
             res.send({ status: 0, message: response.data.status_desc });
             }
        })
          .catch((e) => {
            console.error(e)
          })
}
        

exports.generateQr =async (req, res) => {

    try{
        QRCode.toDataURL('eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1MTNCODIxRUU0NkM3NDlBNjNCODZFMzE4QkY3MTEwOTkyODdEMUYiLCJ4NXQiOiJGUk80SWU1R3gwbW1PNGJqR0w5eEVKa29mUjgiLCJ0eXAiOiJKV1QifQ.eyJkYXRhIjoie1wiU2VsbGVyR3N0aW5cIjpcIjI5QUFCQ1QxMzMyTDAwMFwiLFwiQnV5ZXJHc3RpblwiOlwiMjlBV0dQVjcxMDdCMVoxXCIsXCJEb2NOb1wiOlwiR09LVUwvMTJcIixcIkRvY1R5cFwiOlwiSU5WXCIsXCJEb2NEdFwiOlwiMDgvMDQvMjAyNFwiLFwiVG90SW52VmFsXCI6MTI5MDgsXCJJdGVtQ250XCI6MSxcIk1haW5Ic25Db2RlXCI6XCIxMDAxXCIsXCJJcm5cIjpcIjY0MDI3ZmExNjhkMjQzYTBhODQ4YTMwODJmYzliYTllNWE0Y2RjMWMwNTgxMGRlYmRkNjdjMzU2YzViOGMwNTFcIixcIklybkR0XCI6XCIyMDI0LTA0LTA4IDE4OjA2OjAwXCJ9IiwiaXNzIjoiTklDIFNhbmRib3gifQ.L1c3Z4skZW4fHwGbvBdbwl0k0ya8MLQDbXdeDoYz3GRW4zeFuf_XIoz2gHwUVeCAetVLRGUcX_N84xIU_0FNa_EIWXbYl2fQ2bcb4YWYyQP_UuZdUGZx1-Jj84eMhAYc9s2UrIOMJi3dIwZ48QwTsE5D0EjO1iCgW7zshFZc_EJ4LibyiSlOIsqdbzUR8PBVhu1mPf6LbFGLzGq2sY22bUNElvL9ku3XZQ1_ySj2dOojhKa-bp2434A8x-pMnShGnI8gcGF0GSMELB2dyoVTW1i8XejLJ75tYqoBjqhBiHwy5FTj4S5qGu4bWYuOHjSCox-HQyvcWfC4eGuQFh3F-w', { type: 'terminal' }, function (err, url) {
            if (err) {
                res.status(500).json({ status: false, message: err });
            } else {
                res.send(url);
            }
        });

        // QRCode.toDataURL('eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1MTNCODIxRUU0NkM3NDlBNjNCODZFMzE4QkY3MTEwOTkyODdEMUYiLCJ4NXQiOiJGUk80SWU1R3gwbW1PNGJqR0w5eEVKa29mUjgiLCJ0eXAiOiJKV1QifQ.eyJkYXRhIjoie1wiU2VsbGVyR3N0aW5cIjpcIjI5QUFCQ1QxMzMyTDAwMFwiLFwiQnV5ZXJHc3RpblwiOlwiMjlBV0dQVjcxMDdCMVoxXCIsXCJEb2NOb1wiOlwiR09LVUwvMTJcIixcIkRvY1R5cFwiOlwiSU5WXCIsXCJEb2NEdFwiOlwiMDgvMDQvMjAyNFwiLFwiVG90SW52VmFsXCI6MTI5MDgsXCJJdGVtQ250XCI6MSxcIk1haW5Ic25Db2RlXCI6XCIxMDAxXCIsXCJJcm5cIjpcIjY0MDI3ZmExNjhkMjQzYTBhODQ4YTMwODJmYzliYTllNWE0Y2RjMWMwNTgxMGRlYmRkNjdjMzU2YzViOGMwNTFcIixcIklybkR0XCI6XCIyMDI0LTA0LTA4IDE4OjA2OjAwXCJ9IiwiaXNzIjoiTklDIFNhbmRib3gifQ.L1c3Z4skZW4fHwGbvBdbwl0k0ya8MLQDbXdeDoYz3GRW4zeFuf_XIoz2gHwUVeCAetVLRGUcX_N84xIU_0FNa_EIWXbYl2fQ2bcb4YWYyQP_UuZdUGZx1-Jj84eMhAYc9s2UrIOMJi3dIwZ48QwTsE5D0EjO1iCgW7zshFZc_EJ4LibyiSlOIsqdbzUR8PBVhu1mPf6LbFGLzGq2sY22bUNElvL9ku3XZQ1_ySj2dOojhKa-bp2434A8x-pMnShGnI8gcGF0GSMELB2dyoVTW1i8XejLJ75tYqoBjqhBiHwy5FTj4S5qGu4bWYuOHjSCox-HQyvcWfC4eGuQFh3F-w',{type:'terminal'}, function (err, url) {
        //     res.send(url)
        // })

    }catch(e){
        res.json({status:false,message:e})
    }
}


exports.sendMailWithAtt  = async(req,res) =>{  
  try {

    //sample response for attachment
    // {"fileAttachment":[{"fileUrl":"https://generalasset.s3.amazonaws.com/SampleXLSFile_19kb.xls","fileName":"SampleXLSFile_19kb.xls"},{"fileUrl":"https://generalasset.s3.amazonaws.com/SampleDOCFile_100kb.doc","fileName":"SampleDOCFile_100kb.doc"},{"fileUrl":"https://generalasset.s3.amazonaws.com/SamplePNGImage_1mbmb.png","fileName":"SamplePNGImage_1mbmb.png"},{"fileUrl":"https://generalasset.s3.amazonaws.com/WhatsApp+Image+2024-03-28+at+7.05.49+PM.jpeg","fileName":"WhatsApp+Image.jpeg"},{"fileUrl":"https://generalasset.s3.amazonaws.com/mailtemp.html","fileName":"mailtemp.html"}],"receiverMailId":"gokul@cortexmarketing.in","mailSubject":"tesing mail subject"}      
    
    const {fileAttachment,receiverMailId,mailSubject,content} = req.body

    const createMultiAttRaw = await Promise.all(fileAttachment.map(async (item, i) => {
      try {
          const response = await axios.get(item.fileUrl, {
              responseType: 'arraybuffer'
          });
          const attachmentContent = Buffer.from(response.data, 'binary').toString('base64');
          let contentType = 'application/octet-stream'; // Default content type for unknown files
          // Determine the content type based on file extension
          if (item.fileName.endsWith('.pdf')) {
              contentType = 'application/pdf';
          } else if (item.fileName.endsWith('.jpg') || item.fileName.endsWith('.jpeg')) {
              contentType = 'image/jpeg';
          } else if (item.fileName.endsWith('.png')) {
              contentType = 'image/png';
          }
          
          return (
              `--NextPart\n` +
              `Content-Type: ${contentType}; name="${item.fileName}"\n` +
              `Content-Disposition: attachment; filename="${item.fileName}"\n` +
              `Content-Transfer-Encoding: base64\n\n` +
              `${attachmentContent}\n\n`
          );
  
      } catch (error) {
          console.error(`Error fetching file ${item.fileUrl}:`, error);
          return null;
      }
  }));

    const attachmentsData = createMultiAttRaw.join('');
    const emailResponse = await sendEmailWithAttachment(receiverMailId, mailSubject,content, attachmentsData);
    console.log('Email sent successfully:', emailResponse);
    res.json({status:true,message:"Email sent successfully",emailResponse})

  } catch (err) {
    res.json({status:false,message:"Failed to send mail",err:err})

    console.error('Error sending email:', err);
  }
}

async function sendEmailWithAttachment(to, subject,content, attachmentContent) {
const rawEmail = await createRawEmail(to, subject,content, attachmentContent);
const params = {
  Source: "gokul@cortexmarketing.in",
  Destinations: to,

  RawMessage: {
    Data: rawEmail
  }
};

return ses.sendRawEmail(params).promise();
}

function createRawEmail(to, subject,content ,attachmentContent) {
const rawEmail = `From: gokul@cortexmarketing.in\n` +
    `To: ${to}\n` +
    `Subject: ${subject}\n` +
    `MIME-Version: 1.0\n` +
    `Content-Type: multipart/mixed; boundary="NextPart"\n\n` +
    `--NextPart\n` +
    `Content-Type: text/plain\n\n` +
    `${content}\n\n`
    // `Hello,\n\n` +
    // `Please find the attached files.\n\n` 
    + attachmentContent +
    `--NextPart--`;

return rawEmail;
}


exports.htmlToPDF  = async(req,res) =>{  
try {

   const {outType,toName,toCompanyName,toCompanyLocation,dealType,roNumber,roDate,companyName,channelName,agencyName,advertiserName,campaignStart,campaignEnd,campaignDays,ratePerSec,timeRange,addDuration,spotPerDay,totalSpot,totalSecond,netAmount,gstAmount,payAfterTax,roGeneratedAt} = req.body
  
  const reqData = req.body;

  const s3Params = {
    Bucket:config.shivaAdsAWS_S3.transDocBucket,
    Key: `${outType}.html`
  }
    const s3Response = await s3.getObject(s3Params).promise();
    htmlVal = s3Response.Body.toString('utf-8');
    const htmlPlaceHolderValue = await replacePlaceholders(htmlVal,reqData)

  async function htmlToPdf(htmlString, outputPath) {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
  
      // Set the viewport size to fit the entire content without scrolling
      await page.setViewport({
          width: 1920, // Adjust the width as needed
          height: 3000, // Adjust the height as needed to fit all content
          deviceScaleFactor: 1,
      });
  
      // Set the HTML content of the page
      await page.setContent(htmlString);
  
      // Generate PDF from the page content
      await page.pdf({
          path: outputPath,
          format: 'A4',
          printBackground: true,
          displayHeaderFooter: false,
          margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
          scale: 0.7, // Adjust the scale factor to fit all content
      });
  
      await browser.close();
  }


async function uploadToS3(filePath, fileNameValue, bucketName) {
  const fileContent = fs.readFileSync(filePath);

  const params = {
      Bucket: bucketName,
      Key: Date.now().toString()+"_"+ fileNameValue,
      Body: fileContent
  };
  fs.unlinkSync(outputPath);

  return s3.upload(params).promise();
}
// Example usage
const htmlString = htmlPlaceHolderValue
const outputPath = `./public/files/${outType}.pdf`;
const fileNameValue = `${outType}.pdf`;

// Convert HTML to PDF
htmlToPdf(htmlString, outputPath)
  .then(() => {
      console.log('PDF generated successfully');
      // Upload PDF to S3
      // 
      return uploadToS3(outputPath, fileNameValue, config.shivaAdsAWS_S3.bucket);
  })
  .then(data => {console.log('File uploaded to S3:', data.Location);res.json({status:true,location:data.Location})})
  .catch(error => console.error('Error:', error));



} catch (err) {
  res.json({status:false,message:"Failed to send mail",err})
  console.error('Error sending email:', err);
}
}

function replacePlaceholders(template, data) {
  let populatedContent = template;
  for (const key in data) {
      const placeholder = `{${key}}`;
      populatedContent = populatedContent.replace(placeholder, data[key]);
  }
  return populatedContent;
}
