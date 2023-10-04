import ITransaction from "../interfaces/ITransaction";
import SequelizeTransaction from "../database/models/SequelizeTransactions";
import { log } from "console";


export default class UsersModel {
    private sequelizeTransaction = SequelizeTransaction;

    async findAll(): Promise<ITransaction[]> {
        const dbData = await this.sequelizeTransaction.findAll();

        const transactions = dbData.map((transaction) => {
            return {
                transactionId: transaction.transactionId,
                accountId: transaction.accountId,
                date: transaction.date,
                value: transaction.value,
                cashback: transaction.cashback,
            };
        });
        
        return transactions as unknown as ITransaction[];
    }

    async registerPayment(userId: number, value: number): Promise<number> {
        const payment = await this.sequelizeTransaction.create({
            accountId: userId,
            date: new Date(),
            value: value,
            cashback: 0,
        } as unknown as ITransaction);

        return payment.transactionId;
    }

    async registerCashback(userId: number, transactionId: number, value: number): Promise<string> {

        const transaction = await this.sequelizeTransaction.findOne({
            where: {
                transactionId: Number(transactionId),
            }
        });

        if(!transaction) return 'Transition not found';

        if(userId !== transaction.accountId) return 'You do not have permission to perform this operation';

        log(transaction.transactionId);

        await this.sequelizeTransaction.update({
            cashback: value,
        }, {
            where: {
                transactionId: transactionId,
            }
        });

        return "Ok";
    }

    async findTransactionByAcc(userId: number): Promise<ITransaction[]> {
        const dbData = await this.sequelizeTransaction.findAll({
            where: {
                accountId: Number(userId),
            }
        });

        const transactions = dbData.map((transaction) => {
            return {
                transactionId: transaction.transactionId,
                accountId: transaction.accountId,
                date: transaction.date,
                value: transaction.value,
                cashback: transaction.cashback,
            };
        });
        
        return transactions as unknown as ITransaction[];
    }


}