import express from 'express';

const app = express();

app.get('/' , (req , res)=>{
    res.send("Welcome to the Electronic Election App!")
})

app.listen(3000 , ()=>{
    console.log("server is listening on port 3000 ...")
})