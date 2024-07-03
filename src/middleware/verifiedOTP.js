
import { User } from "../../database/models/user.model.js"
import { AppError } from "../utils/AppError.js"
export const verifiedOTP = async(req,res,next)=>{
let user = await User.findOne({email:req.body.email})
if(!user){
    return next(new AppError("Email Not Found" , 402))
}
if(user.isVerified != true) return next(new AppError("Verify Your Email First" , 402))
next()
} 