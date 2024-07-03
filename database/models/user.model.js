import { Schema, model } from "mongoose";

function generateExpirationDate() {
  const now = new Date();
  return new Date(now.getTime() + 15 * 60000); // 15 minutes in milliseconds
}

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
  },
  {
    timestamps: {
      updatedAt: false,
    },
    versionKey: false,
  }
);

export let User = model("User", schema);
