const Joi = require("joi");

const notificationListQuerySchema = Joi.object({
  status: Joi.string().valid("PENDING", "PROCESSING", "SENT", "FAILED"),

  channel: Joi.string().valid("EMAIL"),

  type: Joi.string().valid("POLL_RESULT"),

  sort: Joi.string()
    .valid(
      "createdAt",
      "-createdAt",
      "sentAt",
      "-sentAt",
      "attempts",
      "-attempts",
    )
    .default("-createdAt"),

  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(50).default(20),
});
module.exports = { notificationListQuerySchema };
