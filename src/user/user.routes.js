import express from "express";
import UserController from "./user.controller.js";

const userRouter = express.Router();

const userController = new UserController();
userRouter.post("/sign-in", userController.signIn);
userRouter.post("/sign-up", userController.signUp);

export default userRouter;
