import express from "express"
import * as https from "https"
import * as fs from "fs"

const app = express()

app.use(express.static("docs"))

const privateKey  = fs.readFileSync('secrets/trcevents.com-key.pem', 'utf8');
const certificate = fs.readFileSync('secrets/trcevents.com.pem', 'utf8');

https.createServer({key: privateKey, cert: certificate}, app).listen(8443, () => { console.log("started at https://trcevents.com:8443/test.html") });