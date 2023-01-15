import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name:'Users', schema:UsersSchema}])],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository],
  exports: [UsersService,UsersRepository],
})
export class UsersModule {}
