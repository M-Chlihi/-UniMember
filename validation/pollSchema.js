const Joi = require("joi");

const listPollsQuerySchema = Joi.object({
  status: Joi.string().valid(
    "DRAFT",
    "SCHEDULED",
    "OPEN",
    "CLOSED",
    "CANCELLED",
  ),

  sort: Joi.string()
    .valid(
      "createdAt",
      "-createdAt",
      "startsAt",
      "-startsAt",
      "endsAt",
      "-endsAt",
      "title",
      "-title",
    )
    .default("-createdAt"),

  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(50).default(10),
});

const createPollSchema = Joi.object({
  title: Joi.string().trim().min(5).max(150).required(),

  description: Joi.string().trim().max(1000).allow("", null),

  startsAt: Joi.date().iso().required(),

  endsAt: Joi.date().iso().greater(Joi.ref("startsAt")).required(),
});

module.exports = {
  createPollSchema,
  listPollsQuerySchema,
};
