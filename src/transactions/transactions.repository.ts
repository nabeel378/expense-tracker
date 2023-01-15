import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectModel('Transactions') private readonly transactionModel: Model<Transactions>,
  ) { }

  create(createTransactionDto: TransactionDto): Promise<any> {
    return this.transactionModel.create(createTransactionDto)
  }

  async findAllById(id: string,startDate:Date,endDate:Date):Promise<any[]>{
    let query :any= {};
    if(startDate && endDate){
      let start = new Date(startDate)
      start.setHours(0, 0, 0, 0);
      let end = new Date(endDate);
      end.setHours(23, 59, 0, 0);
      query.createdAt = { $gte: start, $lte: end }
    }
    return await this.transactionModel.aggregate([
      {$match:{ "userId" : id}},
      {$match:query},
      
      {$lookup:{
      as:"users",from:"users",let:{categoryId:"$categoryId",userId:"userId"},pipeline:[
      
      {
      $match:{$expr:["$_id","$$userId"]}},
      {$unwind:"$categories"},
      {$match:{$expr:["$_id","$$categoryId"]}},
      {$project:{
      totalBalance:"$balance",
      email:"email",
      categories:"$categories.name",
      expense:"$categories.expense",
      income:"$categories.income",
      
      }}
      ]}},
      {$unwind:"$users"}
      ,{
      
      $project:{
      userId:1,
      categoryId:1,
      expense:1,
      income:1,
      balance:1,
      createdAt:1,
      totalBalance:"$users.totalBalance",
      email:"$users.email",
      totalExpense:"$users.expense",
      totalIncome:"$users.income",
      categories:"$users.categories",
      }}
      
      ]) as unknown[]
      
  }

  findAll() {
    return `This action returns all users`;
  }

 
}

