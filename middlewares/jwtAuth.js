//this file authenticate the token send by client

import jwt from 'jsonwebtoken';

const jwtAuth = (req , res , next)=>{

    //1.extracting token from req header
    const token = req.headers["authorization"];

    //2.if there is no token returning error, that is not a authenticated used
    if(!token){
        return res.status(400).send("Unauthorized access");
    }

    //3.if token is found then validating token so that , someone is not trying to doing malpractice
    try{
        const payLoad = jwt.verify(token , "J8TqcEADLn[i%6BBCnbTv--Sg[/5;TV|");
        console.log(payLoad);
    }
    catch(e){
        return res.status(401).send("Unauthorized access");
    }

    //calling next middleware
    next();
}

export default jwtAuth;