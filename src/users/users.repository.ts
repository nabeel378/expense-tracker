import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Users } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<Users>,
  ) { }

  create(createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userModel.create(createUserDto)
  }

  inc(filter:Object,key:string,value:number){
    return this.userModel.updateOne(filter,{$inc:{[key]:value}})
  }

 



  findAll() {
    return this.userModel.find().lean()
  }

  findOne(id: UserDto) {
    return this.userModel.findOne(id).lean()
  }

  update(filter: Partial<UpdateUserDto>, updateUserDto: {name:string,expense:number,income:number}) {
    return this.userModel.updateOne(filter,updateUserDto)
  }

  pushObject(filter: UpdateUserDto, updateUserDto: any) {
    return this.userModel.updateOne(filter,{$push:{categories: updateUserDto}})
  }

  pullObject(filter: UpdateUserDto, _id: any) {
    return this.userModel.updateOne(filter,{$pull:{categories: {_id:_id}}})
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

