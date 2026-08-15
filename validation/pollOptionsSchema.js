const Joi = require("joi");

const createPollOptionSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required(),

  description: Joi.string().trim().max(500).allow("", null),
});

module.exports = { createPollOptionSchema };
