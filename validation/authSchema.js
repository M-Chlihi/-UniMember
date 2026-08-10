const Joi = require("joi");
const ROLES_LIST = require("../config/roles_list");

const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().min(8).max(124).required(),
});
const loginSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().min(8).required(),
});

const updateRolesSchema = Joi.object({
  roles: Joi.object({
    User: Joi.number().valid(ROLES_LIST.User),
    Editor: Joi.number().valid(ROLES_LIST.Editor),
    Admin: Joi.number().valid(ROLES_LIST.Admin),
  })
    .min(1)
    .required(),
});

module.exports = { registerSchema, loginSchema, updateRolesSchema };

//  department: Joi.string().trim().required(),
//   salary: Joi.required(),
