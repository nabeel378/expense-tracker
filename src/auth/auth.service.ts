import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(loginDTO: LoginDTO): Promise<any> {
        const user = await this.usersService.getUserByEmail(loginDTO.email);
        const encryptedPassword = await this.usersService.encryptPassword(loginDTO.password);
        //@ts-ignore
        if (user && user.password == encryptedPassword) {
            const { password, ...rest } = user;
            return rest
        }
        return null
    }

    async login(user: any):Promise<any> {
        const userObj = {
            _id: user._id,
            createdAt: new Date().getTime(),
            expiryTime: process.env.TOKEN_EXPIRY,
            userClaims: {
                userType: user.userType
            }
        };
        user.password = "";
        return {
            token: this.jwtService.sign(userObj),
            userType: user.userType,
            user: user
        }
    }

}
