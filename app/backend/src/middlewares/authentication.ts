import { Request, Response, NextFunction, RequestHandler } from 'express';
import { tokenValidation } from '../auth';
import Payload from '../interfaces/loginPayload';
import { log } from 'console';

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const { authentication } = req.headers;

    if (!authentication) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        tokenValidation(authentication as string);

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export default authentication;