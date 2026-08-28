const Joi = require("joi");

const notificationListQuerySchema = Joi.object({
  pollId: Joi.string().hex().length(24).optional(),
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

const notificationHistoryQuerySchema = Joi.object({
  type: Joi.string().valid("POLL_RESULT"),

  channel: Joi.string().valid("EMAIL"),

  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(50).default(20),
});
const notificationSummaryQuerySchema = Joi.object({
  pollId: Joi.string().hex().length(24),

  type: Joi.string().valid("POLL_RESULT"),

  channel: Joi.string().valid("EMAIL"),
});
module.exports = {
  notificationListQuerySchema,
  notificationHistoryQuerySchema,
  notificationSummaryQuerySchema,
};
