
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require("fs");
const config = require("../nodedetails/config");

const db = require("../models/db");

//testing
const common = require("../common/encDec");
const nommoc = require("../common/nommoc");

const route = require('../routes/route');
const app = express();
let port = config.port;

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.set("port", port);
app.use(logger("dev"));

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set('trust proxy', true)   //for real ip address

app.use(function (req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'POST,PATCH,GET,PUT,DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
});


app.get("/jsonsize", (req, res) => {
     var obj = req.body
     // const size = Buffer.byteLength(JSON.stringify(obj))
     const size = new TextEncoder().encode(JSON.stringify(obj)).length
     const kiloBytes = size / 1024;
     const megaBytes = kiloBytes / 1024;
     console.log(megaBytes, "megaBytes")
})

app.get("/test", (req, res) => {
     res.json({ status: true, message: "Shiva Ads backend working fine" })

});


app.get('/logs', (req, res) => {
     console.log("logcomming")
     let file = path.join(__dirname, '../logs/combined.outerr.log');
     fs.readFile(file, 'utf-8', (err, data) => {
          console.log(err, "err")
          res.json(data);
     })
})

app.get('/emptyLogs', (req, res) => {
     let file = path.join(__dirname, '../logs/combined.outerr.log');
     fs.writeFile(file, "", (err, data) => {
          res.json("Logs truncated");
     })
})

app.use("/", route);


app.post("/enc", (req, res) => {
     var data = common.encrypt(req.body.value);
     res.json({ "status": true, "data": data })
})

app.post("/dec", (req, res) => {
     var data = common.decrypt(req.body.value);
     res.json({ "status": true, "data": data })
})


app.post("/credential/enc", (req, res) => {
     var data = nommoc.encrypt(req.body.value);
     res.json({ "status": true, "data": data })
})

app.post("/credential/dec", (req, res) => {
     var data = nommoc.decrypt(req.body.value);
     res.json({ "status": true, "data": data })
})

//both m/w not working accdt Jade

app.use(function (err, req, res, next) {
     res.locals.message = err.message;
     res.locals.error = req.app.get("env") === "development" ? err : {};
     res.locals.title = 'Error'
     res.status(err.status || 500);
     res.render("error", {
          message: err.message,
          error: err,
          title: 'Error'
     })
});

app.all('/*', (req, res) => {
     res.status(404).json({ status:false , message: 'Invalid URL.!!!' });
});


let server;
if (config.serverType == "http") {
     const http = require("http");
     server = http.createServer(app);

     server.listen(port, () => console.log(`Local Back End server is running on http://localhost:${port}`));

} else {
     const https = require("https");
     server = https.createServer(config.serverOptions, app);
     server.listen(port, () => console.log(` Back End server is running on `));
}


module.exports = app;


