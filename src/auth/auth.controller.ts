import { Controller, UseGuards, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    //  @UseFilters(new ExceptionFilter())
    //  @MessagePattern("login")
    @Post('/login')
    async login(@Body() loginDTOs: LoginDTO): Promise<{ name: string }> {

        let user = await this.authService.validateUser(loginDTOs);
        if (!user) {
            throw new UnauthorizedException("User credentials invalid");
        }
        return this.authService.login(user);
    }

    @Post('/signup')
    @HttpCode(201)
    async singup(
        @Body() user: CreateUserDto
    ) {
        const checkUser = await this.usersService.getUserByEmail(user.email);
        if (checkUser) {
            throw (new BadRequestException("User already exists."));
        }
        else {
            const encryptedPassword = await this.usersService.encryptPassword(user.password) as unknown as string;
            const userData = await this.usersService.create({
                email: user.email,
                password: encryptedPassword
            });
            return {statusCode:201,data:userData,message:""};
        }
    } 
}

