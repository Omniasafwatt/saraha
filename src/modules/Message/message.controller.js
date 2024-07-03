import { catchError } from "./../../middleware/catchError.js";
import { Message } from "./../../../database/models/message.model.js";
import { AppError } from "../../utils/AppError.js";
import { messageVal } from "../../validation/message.js";

const addMessage = catchError(async (req, res, next) => {
  
  let {error} = messageVal.validate(req.body,{abortEarly:false})
  if(!error){
    let id = req.params.id;
    let message = await Message.insertMany({
      content: req.body.content,
      receiverId: req.params.id,
    });
    res.json({ message: "success", message });
  }else{
    next(new AppError(`${error.details[0].message}` , 401))
  }
  
});

const getAllMessage = catchError(async (req, res, next) => {
  let message = await Message.find({ receiverId: req.user.userID });
  res.status(201).json({ message: "Success", message });
});

const deleteMessage = catchError(async (req, res, next) => {
  let message = await Message.findByIdAndDelete(req.params.id);
  if (!message) return next(new AppError("Message Not Found", 404));
  res.status(201).json({ message: "Deleted", message });
});

export { addMessage, getAllMessage, deleteMessage };
