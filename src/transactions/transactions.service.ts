import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
// import { UsersRepository } from 'src/users/users.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionDto } from './dto/transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactisonsRepository: TransactionsRepository,
    private readonly usersRepository: UsersRepository
  ) { }

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    try {
      let transactionOBJ = new TransactionDto();
      Object.assign(transactionOBJ, createTransactionDto)
      Object.assign(transactionOBJ, { userId })
      let getUser = await this.usersRepository.findOne({_id:userId})
      //@ts-ignore
      transactionOBJ.balance = getUser.balance-transactionOBJ.expense+transactionOBJ.income;
      let rsp = await this.transactisonsRepository.create(transactionOBJ)
      if (rsp) {
        let promise: any = [];
        promise.push(this.usersRepository.inc({_id: userId}, "balance", -transactionOBJ.expense));
        promise.push(this.usersRepository.inc({_id: userId}, "balance", +transactionOBJ.income));
        promise.push(this.usersRepository.inc({_id: userId,"categories._id":transactionOBJ.categoryId}, `categories.$.income`, +transactionOBJ.income));
        promise.push(this.usersRepository.inc({_id: userId,"categories._id":transactionOBJ.categoryId}, `categories.$.expense`, +transactionOBJ.expense));
        await Promise.allSettled(promise)
        return rsp
      }
    } catch (err) {
      throw (new InternalServerErrorException(err.message));
    }
  }
  async findAllByUserId(id: string,startDate:Date,endDate:Date) {
    return await this.transactisonsRepository.findAllById(id,startDate,endDate)
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
