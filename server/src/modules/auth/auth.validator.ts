import Joi from 'joi';

export const userRegisterSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),

  phone_number: Joi.string()
    .pattern(/^[0-9]{10}$/) // Nepal format: 10 digits (you can adjust)
    .required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(8).max(100).required(),

  citizenship_no: Joi.string().min(5).max(30).required(),

  document_type: Joi.string()
    .valid('CITIZENSHIP', 'PASSPORT', 'NID') // << ENUM VALUES
    .required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().min(8).max(100).required(),
});
