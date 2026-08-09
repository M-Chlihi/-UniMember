const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().min(6).max(30).required(),
});

const validateUser = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = validateUser;
