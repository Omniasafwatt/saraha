import { createTransport } from "nodemailer";
import  jwt  from 'jsonwebtoken';
import { emailHtml } from "./emailHtml.js";

export const sendEmail = async(code , email)=>{
    
const transporter = createTransport({
    service:"gmail",
    auth: {
      user: "omnia.safwat100@gmail.com",
      pass: "esdoolnpjttyuxel",
    },
  });
  
  jwt.sign({email} , "test" ,async (err,token)=>{
    const info = await transporter.sendMail({
        from: '"dondon 👻" <omnia.safwat100@gmail.com>',
        to: email, 
        subject: "Hello ✔", 
      
        html: emailHtml(token , code) 
      });
      console.log("Message sent: %s", info.messageId);
  })
  
   
}