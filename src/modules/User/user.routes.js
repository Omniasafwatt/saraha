import { Router } from "express";
import { checkCode, login, register } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { verifiedOTP } from "../../middleware/verifiedOTP.js";


export const userRouter = Router()

userRouter.post('/register' , checkEmail , register)
userRouter.post('/login' , verifiedOTP, login)
userRouter.get('/verify/:token' , checkCode)