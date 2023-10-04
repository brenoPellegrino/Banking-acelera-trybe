import * as joi from 'joi';

const createLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  name: joi.string().required(),
  cpfCnpj: joi.string().required(),
});

export default createLoginSchema;