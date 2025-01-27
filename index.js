import cookieParser from 'cookie-parser';
import express from 'express';
import { readFileSync } from 'fs';
import https from 'https';
import * as path from 'path';
import connectToMongoose from './config/mongodb-config.js';
import jwtAuth from './middlewares/jwtAuth.js';
import userRouter from './src/user/user.routes.js';
import votesRouter from './src/votes/votes.routes.js';


const app = express(); //responsible for request and response
app.use(express.json());
app.use(cookieParser())

//key and signed certificate--------------------------------
const options = {
    key:readFileSync(path.join('CA' , 'server-key.pem')),
    cert:readFileSync(path.join('CA','server-cert.pem'))
}
const ssl_server =  https.createServer(options , app) //acting as CA(certificate authority)----------


app.use('/api/user' , userRouter);
app.use('/api/vote',jwtAuth , votesRouter)

app.get('/' , (req , res)=>{
    res.send("Welcome to the Electronic Election App!")
})


ssl_server.listen(3000 , ()=>{
    console.log("Your secure server is running on  port 3000")
    connectToMongoose();
})