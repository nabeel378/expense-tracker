import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const TransactionsSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId },
        categoryId: { type: Schema.Types.ObjectId },
        income: { type: Number },
        expense: { type: Number },
        balance: { type: Number },
    },
    { timestamps: true },
);

export interface Transactions extends mongoose.Document {
    userId: string;
    categoryId: string;
    income:number,
    expense:number,
    balance:number
}
