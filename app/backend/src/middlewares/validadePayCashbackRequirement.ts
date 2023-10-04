import { Request, Response, NextFunction, RequestHandler } from 'express';
import registerPayCashbackSchema from '../schemas/transactions/registerPayCashbackSchema';

const validatePayCashbackRequirement: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const isValid = registerPayCashbackSchema.validate(req.body);

    if (isValid.error) {
        return res.status(400).json({ message: isValid.error.message });
    }

    next();
}

export default validatePayCashbackRequirement;