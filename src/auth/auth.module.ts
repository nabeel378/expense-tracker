import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/users/entities/user.entity';
// dotenv.config();

@Module({
  imports:
    [MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),

      UsersModule, 
      PassportModule,
      JwtModule.register({
        secret: "123456",
        signOptions: { expiresIn: "1h" }
      }),
      UsersModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService, UsersRepository],
  exports: [AuthService, UsersModule],
  controllers: [AuthController]
})
export class AuthModule { }
