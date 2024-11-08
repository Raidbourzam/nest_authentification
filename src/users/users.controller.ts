import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { LoginUserDto } from './dto/login_user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async getUsers() : Promise<User[]>{
    return await this.usersService.getUsers();
  }

  @Post('login')
  async loginUser(@Body() loginUserDto : LoginUserDto) : Promise<{token: string}>{
    return await this.usersService.login(loginUserDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) : Promise<User>{
    return await this.usersService.register(createUserDto);
  }


}
