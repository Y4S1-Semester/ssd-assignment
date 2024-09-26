import Joi from 'joi';

const postSchema = Joi.object({
    title: Joi.string().trim().min(3).max(255).required(),
    desc: Joi.string().min(10).required(),
    img: Joi.string().pattern(/\.(jpeg|jpg|png|gif)$/i).optional(),
    cat: Joi.string().required(),
    date: Joi.string().optional(),
});

export { postSchema };
