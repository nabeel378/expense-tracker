import { Controller, Request, UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth("access-token")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Post("/category")
  async createCategory(@Request() req, @Body() createCategory: CreateCategoryDto) {
    return await this.usersService.pushCategory(req.user._id, createCategory.name)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({name: 'id', required: true,  schema: { oneOf: [{type: 'string'}]}})
  @Delete("/category/:id")
  @ApiBearerAuth()
  async deleteCategory(@Request() req, @Param() paramDTO: { id: string }) {
    return await this.usersService.pullObject(req.user._id, paramDTO.id)
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get()
  async findAll(@Request() req){
    return this.usersService.findAll()
  }

}
