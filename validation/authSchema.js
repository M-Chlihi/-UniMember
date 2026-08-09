const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().min(8).max(124).required(),
});
const loginSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().min(8).required(),
});

module.exports = { registerSchema, loginSchema };

//  department: Joi.string().trim().required(),
//   salary: Joi.required(),
