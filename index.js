import express from 'express';
import { readFileSync } from 'fs';
import https from 'https';
import * as path from 'path';
const app = express();
const options = {
    key:readFileSync(path.join('CA' , 'server-key.pem')),
    cert:readFileSync(path.join('CA','server-cert.pem'))
}
const ssl_server =  https.createServer(options , app)

app.get('/' , (req , res)=>{
    res.send("Welcome to the Electronic Election App!")
})
app.use('/',(req , res)=>{
    res.send("Welcome");
})

ssl_server.listen(3000 , ()=>{
    console.log("Your secure server is running on  port 3000")
})