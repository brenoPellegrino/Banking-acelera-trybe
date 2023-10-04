import * as joi from 'joi';

const registerPayCashbackSchema = joi.object({
  value: joi.number().required(),
});

export default registerPayCashbackSchema;