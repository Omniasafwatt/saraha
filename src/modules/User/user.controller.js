import { sendEmail } from "../../emails/sendEmail.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { User } from "./../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginVla } from "../../validation/login.js";

const register = catchError(async (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  req.body.otpCode = Math.floor(Math.random() * 1000000); 

  let user = await User.create(req.body); 

  user.password = undefined;
  sendEmail(user.otpCode, user.email);
  console.log(user.otpCode);
  res.status(201).json({ message: "Success", user });
});

const login = catchError(async (req, res, next) => {
  let { error } = loginVla.validate(req.body, { abortEarly: false });
  if (!error) {
    let user = await User.findOne({ email: req.body.email });
    if (!user || !bcrypt.compareSync(req.body.password, user.password))
      return next(new AppError("Incorrect Email or Password", 402));
    jwt.sign(
      { userID: user._id, userEmail: user.email, userName: user.userName },
      "Sarah",
      (err, token) => {
        if (err) return next(new AppError("Login Error", 401));
        res.status(201).json({ message: "Login", token });
      }
    );
  } else {
    next(new AppError(`${error.details[0].message}`, 401));
  }
});

const checkCode = catchError(async (req, res, next) => {
  jwt.verify(req.params.token, "test", async (err, payload) => {
    if (err) {
      return next(new AppError("Invalid token", 404));
    }

    const email = payload.email;
    const providedOtp = req.body.otp;

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    if (user.otpCode == providedOtp && Date.now() < user.expiredCode) {
      user.isVerified = true;
      await user.save();
      return res.json({ message: "Success", email });
    } else {
      return next(new AppError("Invalid OTP OR code Expired", 404));
    }
  });
});

export { register, login, checkCode };
