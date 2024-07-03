import { createTransport } from "nodemailer";
import  jwt  from 'jsonwebtoken';
import { emailHtml } from "./emailHtml.js";
import { AppError } from './../utils/AppError.js';

export const sendEmail = async(code , email)=>{
    
const transporter = createTransport({
    service:"gmail",
    auth: {
      user: "baselmahmoudkamal@gmail.com",
      pass: "zhomwlnlssiryutk",
    },
  });
  
  jwt.sign({email} , "test" ,async (err,token)=>{
    const info = await transporter.sendMail({
        from: '"Bassel 👻" <baselmahmoudkamal@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
      
        html: emailHtml(token , code) // html body
      });
      console.log("Message sent: %s", info.messageId);
  })
  
   
}