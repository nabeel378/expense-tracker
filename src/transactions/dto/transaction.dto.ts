import { IsNumber, IsString } from "class-validator"

export class TransactionDto {
    @IsString()
    userId: String
    @IsString()
    categoryId: String
    @IsNumber()
    income: Number
    @IsNumber()
    expense: Number
    @IsNumber()
    balance: Number

}
