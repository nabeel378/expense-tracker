import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateTransactionDto {
    @ApiProperty()
    @IsString()
    categoryId: string
    @ApiProperty()
    @IsNumber()
    income: number = 0
    @ApiProperty()
    @IsNumber()
    expense: number = 0
}
