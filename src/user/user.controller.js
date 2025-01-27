import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
export default class UserController{
    constructor(){
        this.userRepository = new UserRepository()
    }
    async signIn(req , res){
        console.log(req.body);

        const {email , password} = req.body;
        let userDetails = await this.userRepository.get(email , password);
        if(userDetails){
            //1.crete token
            const token = jwt.sign( {userId:userDetails.id , email:userDetails.email} ,"J8TqcEADLn[i%6BBCnbTv--Sg[/5;TV|" ,
            {
                expiresIn:"1h"
            });
            res.cookie("userId" , email);
            //2.send token , which work as key to access the authenticated pages
            return res.status(200).send(token);
        }

        //not  found
        res.status(404).send("User not found with this data .");
    }

    async signUp(req , res){
        const userDetails = req.body;
        await this.userRepository.add(userDetails);
        res.status(200).send("Sign Up succefully !!");
    }
}