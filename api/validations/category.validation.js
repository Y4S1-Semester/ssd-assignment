import Joi from "joi";

const categorySchema = Joi.string().max(100).alphanum().optional();

export { categorySchema };
