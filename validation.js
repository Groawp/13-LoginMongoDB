const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = (json) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(4).required(),
  });

  return schema.validate(json)
};

const loginValidation = (json) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(4).required(),
  });

  return schema.validate(json)
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;