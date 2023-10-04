import * as joi from 'joi';

const loginRequestSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

export default loginRequestSchema;