import { Response, Request } from "express";
import TransactionService from "../services/TransactionsService";
import { tokenValidation } from '../auth';
import mapStatusHTTP from "../helpers/mapStatusHTTP";
import { log } from "console";

export default class TransactionController {
    private service = new TransactionService ();

    async findAll(req: Request, res: Response): Promise<Response>{
        const drinks = await this.service.findAll();

        if(drinks.status !== 'successful') return res.status(mapStatusHTTP(drinks.status)).json(drinks.data);

        return res.status(200).json(drinks);
    }

    async registerPayment(req: Request, res: Response): Promise<Response>{
        const { value } = req.body;
        const token = req.headers.authentication;

        const payload = tokenValidation(token as string);

        const { id: userId , accStatus } = payload;

        if(accStatus !== 'active'){
            return res.status(401).json({ message: 'Acc inactive' });
        }

        const payment = await this.service.registerPayment(userId, value);

        if(payment.status !== 'successful') return res.status(mapStatusHTTP(payment.status)).json(payment.data);

        return res.status(201).json({ transactionId: payment.data});
    }

    async registerCashback(req: Request, res: Response): Promise<Response>{
        const { id: transactionId } = req.params;
        const { value } = req.body;
        const token = req.headers.authentication;

        const payload = tokenValidation(token as string);

        const { id: userId , accStatus } = payload;

        if(accStatus !== 'active'){
            return res.status(401).json({ message: 'Acc inactive' });
        }

        const cashback = await this.service.registerCashback(userId, Number(transactionId),  value);

        if(cashback.status !== 'successful') return res.status(mapStatusHTTP(cashback.status)).json(cashback.data);

        return res.status(200).json({ message: cashback});
    }

    async findTransactionByAcc(req: Request, res: Response): Promise<Response>{
        const token = req.headers.authentication;

        const payload = tokenValidation(token as string);

        const { id: userId , accStatus } = payload;

        if(accStatus !== 'active'){
            return res.status(401).json({ message: 'Acc inactive' });
        }

        const transaction = await this.service.findTransactionByAcc(userId);

        if(transaction.status !== 'successful') return res.status(mapStatusHTTP(transaction.status)).json(transaction.data);

        return res.status(200).json(transaction);
    }
}