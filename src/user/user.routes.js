import express from 'express';
import UserController from './user.controller.js';

const userRouter = express.Router();

const userController = new UserController();
userRouter.post('/sign-in',(req, res)=>{
    userController.signIn(req ,res)
})
userRouter.post('/sign-up' ,(req,res)=>{
    userController.signUp(req,res)
})

export default userRouter;