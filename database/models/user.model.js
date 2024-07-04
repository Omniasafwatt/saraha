import { Schema, model } from "mongoose";

function generateExpirationDate() {
  const now = new Date();
  return new Date(now.getTime() + 5 * 60000); }

let schema = new Schema(
  {
    userName: String,
    email: String,
    password: String,
    otpCode:Number,
    expiredCode: {
      type: Date,
      default: generateExpirationDate,
    },
    isVerified:{
      type:Boolean,
      default:false
    }
  }
);

export let User = model("User", schema);
