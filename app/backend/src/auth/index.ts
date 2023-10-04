import { sign, verify } from 'jsonwebtoken';
import Payload from '../interfaces/loginPayload';

const { JWT_SECRET } = process.env;

const secret = JWT_SECRET || 'secret';



function tokenGenerator(payload: Payload): string {
  const token = sign(payload, secret);

  return token;
}

function tokenValidation(token: string): Payload {
  const response = verify(token, secret) as Payload;

  return response;
}

export {
  tokenGenerator,
  tokenValidation,
};
