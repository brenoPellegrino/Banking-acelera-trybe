import { ServiceResponse } from "../interfaces/ServiceResponse";
import ITransaction from "../interfaces/ITransaction";
import TransactionModel from "../models/TransactionModel";
import { stat } from "fs";

export default class UsersService {
    private transactionModel = new TransactionModel();

    async findAll(): Promise<ServiceResponse<ITransaction[]>>{
        const users = await this.transactionModel.findAll();

        if (!users || users.length === 0) {
            return {
                status: "notFound",
                data: { message: "Not found" }
            };
        }

        return { status: "successful", data: users };
    }

    async registerPayment(userId: number, value: number): Promise<ServiceResponse<number>>{
        const payment = await this.transactionModel.registerPayment(userId, value);

        if (!payment) return { status: "badRequest", data: { message: "Payment not regitred" } };

        return { status: "successful", data: payment};
    }

    async registerCashback(userId: number, transactionId: number, value: number): Promise<ServiceResponse<string>>{
        const cashback = await this.transactionModel.registerCashback(userId, transactionId, value);

        if (cashback !== "Ok") return { status: "badRequest", data: { message: cashback } };

        return { status: "successful", data: cashback };
    }

    async findTransactionByAcc(userId: number): Promise<ServiceResponse<ITransaction[]>>{
        const transactions = await this.transactionModel.findTransactionByAcc(userId);

        if (!transactions || transactions.length === 0) {
            return {
                status: "notFound",
                data: { message: "Not found" }
            };
        }

        return { status: "successful", data: transactions };
    }
}