import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login_user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    const users : User[] = await this.userModel.find();
    if(users.length === 0){
      throw new NotFoundException({message:'No users found',users: []});
    }
    return users;    
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    let user : User = await this.userModel.findOne({email: loginUserDto.email});
    if(user){
      if(user.password !== loginUserDto.password){
        throw new NotFoundException({message:'check ur credintials'})
      }
      return user;
    }
    throw new NotFoundException({message:'user dont exist'})
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    let user : User = await this.userModel.findOne({email: createUserDto.email})
    if(!user){
      user = await new this.userModel(createUserDto);
      const newUser: User= await user.save();
      return newUser;
    }
    throw new ConflictException({message:'user already exist', user})
  }
}
