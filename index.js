import express from 'express';
import { readFileSync } from 'fs';
import https from 'https';
import * as path from 'path';
import connectToMongoDB from './config/mongodb-config.js';
const app = express(); //responsible for request and response

//key and signed certificate
const options = {
    key:readFileSync(path.join('CA' , 'server-key.pem')),
    cert:readFileSync(path.join('CA','server-cert.pem'))
}
const ssl_server =  https.createServer(options , app) //acting as CA(certificate authority)

app.get('/' , (req , res)=>{
    res.send("Welcome to the Electronic Election App!")
})


ssl_server.listen(3000 , ()=>{
    console.log("Your secure server is running on  port 3000")
    connectToMongoDB();
})