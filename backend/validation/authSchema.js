const Joi = require("joi");
const ROLES_LIST = require("../config/roles_list");
const ROLE_NAMES = require("../config/roleNames");
const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required(),

  email: Joi.string().trim().lowercase().email().required(),

  password: Joi.string().min(8).max(128).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),

  password: Joi.string().min(8).required(),
});
const updateRolesSchema = Joi.object({
  roles: Joi.object({
    User: Joi.number().valid(ROLES_LIST.User).required(),

    Editor: Joi.number().valid(ROLES_LIST.Editor),

    Admin: Joi.number().valid(ROLES_LIST.Admin),
  })
    .min(1)
    .required(),
});
const usersListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(50).default(20),

  search: Joi.string().trim().max(100).allow("").default(""),

  role: Joi.string()
    .valid(ROLE_NAMES.User, ROLE_NAMES.Editor, ROLE_NAMES.Admin)
    .allow(""),
});
module.exports = {
  registerSchema,
  loginSchema,
  updateRolesSchema,
  usersListQuerySchema,
};
