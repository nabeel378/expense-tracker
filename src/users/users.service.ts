import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersRepository } from "./users.repository"

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) { }
  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto)
  }

  async pushCategory(_id: any, name: string) {
    try{

      return await this.usersRepository.pushObject(
        { _id },
        { name: name, expense: 0, income: 0 }
        )
      }catch(err){
        throw (new InternalServerErrorException(err.message));
      }
  }

  async pullObject(_id: any, catId: string) {
    try{

      return await this.usersRepository.pullObject(
        { _id },
        catId
        )
      }catch(err){
        throw (new InternalServerErrorException(err.message));
      }
  }

  async encryptPassword(password: string) {
    if (!password) {
      throw (new BadRequestException("Missing Password Field"));
    }
    // const algorithm = process.env.ALGORITHM;
    // const secret: any = process.env.SECRET;
    const algorithm = "sha256";
    const secret: any = "random123@text###()00123qweasdzxc";
    // const encrypted = crypto.createHash(algorithm, secret).update(password).digest('hex');
    // return encrypted;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email }).lean();
    if (!user) {
      return null
    }
    return user
  }

  findAll() {
    return this.usersRepository.findAll()
  }


  findById(id: number) {
    return this.usersRepository.findOne({_id:id});
  }

}
