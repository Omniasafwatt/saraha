import express from "express";
import { AppError } from "./src/utils/AppError.js";
import { userRouter } from "./src/modules/User/user.routes.js";
import { globalError } from './src/middleware/globalError.js';
import { messageRouter } from './src/modules/Message/message.routes.js';
const app = express();
const port = 3000;
app.use(express.json())
app.use('/auth' , userRouter)
app.use('/' , messageRouter)

app.use("*", (req, res, next) => {
    next(new AppError(`This route ${req.originalUrl} is not defined` , 404))
});

app.use(globalError)

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
