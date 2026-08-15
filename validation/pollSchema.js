const Joi = require("joi");

const createPollSchema = Joi.object({
  title: Joi.string().trim().min(5).max(150).required(),

  description: Joi.string().trim().max(1000).allow("", null),

  startsAt: Joi.date().iso().required(),

  endsAt: Joi.date().iso().greater(Joi.ref("startsAt")).required(),
});

module.exports = {
  createPollSchema,
};
