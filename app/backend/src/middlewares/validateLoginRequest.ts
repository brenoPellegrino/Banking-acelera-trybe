import { Request, Response, NextFunction, RequestHandler } from 'express';
import loginRequestSchema from '../schemas/user/loginRequestSchema';

const validateLoginRequest: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const isValid = loginRequestSchema.validate(req.body);

    if (isValid.error) {
        return res.status(400).json({ message: isValid.error.message });
    }

    next();
}

export default validateLoginRequest;