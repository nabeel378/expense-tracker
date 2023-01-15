import { Controller,Request, Get, Post, Body, Query, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@ApiBearerAuth("access-token")
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(req.user._id,createTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiQuery({name:"startDate",required:false,type:Date})
  @ApiQuery({name:"endDate",required:false,type:Date})
  @Get()
  findAll(@Request() req,@Query() query) {
    return this.transactionsService.findAllByUserId(req.user._id,query.startDate,query.endDate);
  }

}
