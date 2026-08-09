const employeeQuerySchema = Joi.object({
  username: Joi.string().trim().min(1).required(),
  lastname: Joi.string().trim().min(1).required(),
  department: Joi.string(),
  isActive: Joi.boolean(),
  sort: Joi.string().valid("salary", "-salary"),
  salary: Joi.number().integer().min(1).default(0),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
