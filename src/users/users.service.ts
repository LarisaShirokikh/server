import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User
    ) {}

    findOne(filter: {
        where: { id?: string; username?: string; email?: string };
      }): Promise<User> {
        return this.userModel.findOne({ ...filter });
      }

      async create(
        createUserDto: CreateUserDto,
      ): Promise<User | { warningMessage: string }> {
        const user = new User();
        
        const existingByEmail = await this.findOne({
          where: { email: createUserDto.email },
        });
    
    
        if (existingByEmail) {
          return { warningMessage: 'Пользователь с таким email уже существует' };
        }
    
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
        user.email = createUserDto.email;
        user.password = hashedPassword;
        
    
        return user.save();
      }
}
