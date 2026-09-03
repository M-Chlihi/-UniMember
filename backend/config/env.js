const dotenv = require("dotenv");
const Joi = require("joi");

// Load env once without overwriting values
dotenv.config();

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "test", "production")
    .default("development"),

  PORT: Joi.number().integer().min(1).max(65535).default(3500),

  DATABASE_URI: Joi.string().trim().when("NODE_ENV", {
    is: "test",
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),

  ACCESS_TOKEN_SECRET: Joi.string()
    .trim()
    .when("NODE_ENV", {
      is: "production",
      then: Joi.string().min(32).required(),
      otherwise: Joi.string().min(1).required(),
    }),

  REFRESH_TOKEN_SECRET: Joi.string()
    .trim()
    .when("NODE_ENV", {
      is: "production",
      then: Joi.string().min(32).required(),
      otherwise: Joi.string().min(1).required(),
    }),

  ACCESS_TOKEN_EXPIRES_IN: Joi.string().trim().min(1).default("120s"),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string().trim().min(1).default("1d"),

  FRONTEND_ORIGIN: Joi.string()
    .trim()
    .uri({ scheme: ["http", "https"] })
    .when("NODE_ENV", {
      is: "test",
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),

  RESEND_API_KEY: Joi.string().trim().when("NODE_ENV", {
    is: "production",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),

  EMAIL_FROM: Joi.string().trim().when("NODE_ENV", {
    is: "production",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),

  MONGOMS_VERSION: Joi.string().trim().optional(),
})
  .unknown(true)
  .required();

const { error, value } = schema.validate(process.env, {
  abortEarly: false,
  convert: true,
});

if (error) {
  const details = error.details.map((detail) => detail.message).join("; ");
  throw new Error(`Invalid environment configuration: ${details}`);
}

if (
  value.NODE_ENV === "production" &&
  !value.FRONTEND_ORIGIN.startsWith("https://")
) {
  throw new Error(
    "Invalid environment configuration: FRONTEND_ORIGIN must use https in production",
  );
}

module.exports = Object.freeze(value);
