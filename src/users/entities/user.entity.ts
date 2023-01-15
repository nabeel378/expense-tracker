import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UsersSchema = new Schema(
    {
        email: { type: String,unique:true },
        password: { type: String },
        balance: {type:Number, default:0},
        role: {type:String, enum:["USER","ADMIN"],default:"USER"},
        categories: [{ name: { type: String }, expense: { type: Number }, income: { type: Number } }]
    },
    { timestamps: true },
);

export interface Users extends mongoose.Document {
    email: string;
    password: string;
    balance: number
    categories : []
}
