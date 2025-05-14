import express from "express"
import * as http from "http"

const app = express()
app.use(express.static("docs"))

http
    .createServer(app)
    .listen(8080, () => { console.log("started at http://trcevents.com:8080/test.html") })
