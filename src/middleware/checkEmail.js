import { User } from "../../database/models/user.model.js";
import { AppError } from "../utils/AppError.js";
export const checkEmail = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return next(new AppError("This email is exist", 402));
  next();
};
