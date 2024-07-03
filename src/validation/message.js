import Joi from "joi";

export const messageVal = Joi.object({
    content: Joi.string().min(2).max(40).required()
});
