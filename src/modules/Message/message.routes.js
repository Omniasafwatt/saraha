import { Router } from "express";
import { addMessage, deleteMessage, getAllMessage } from "./message.controller.js";
import { verifytoken } from "../../middleware/verifyToken.js";

export const messageRouter = Router()

messageRouter.post("/addMessage/:id" , addMessage)
messageRouter.get('/getAllMessages', verifytoken , getAllMessage)
messageRouter.delete('/deleteMessage/:id', verifytoken , deleteMessage)