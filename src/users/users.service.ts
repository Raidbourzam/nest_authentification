import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login_user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,private configService: ConfigService,) {}

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
      const isValidPassword = await bcrypt.compare(loginUserDto.password,user.password)
      if(!isValidPassword){
        throw new NotFoundException({message:'Invalid credintials'})
      }
      return user;
    }
    throw new NotFoundException({message:'user dont exist'})
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    let user : User = await this.userModel.findOne({email: createUserDto.email})
    if(!user){
      const saltOrRounds = parseInt(this.configService.get<string>('SALTORROUNDS'),10); 
      const hashedPassword: string = await bcrypt.hash(createUserDto.password,saltOrRounds);
      user = await new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      const newUser: User= await user.save();
      return newUser;
    }
    throw new ConflictException({message:'user already exist', user})
  }
}
