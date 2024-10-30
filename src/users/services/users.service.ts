import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entities';
import { CreateUserDto } from '../dto/create-user-dto';
import * as bcrypt from 'bcrypt'
import { SigninDto } from 'src/auth/dto/Sign-In-User.dto';
import { NotFoundError } from 'rxjs';
import { createUser } from '../interfaces/user.interfaces';

export type user =any
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  async createUser(createUserDto: createUser):Promise<User>{
    const {
      firstName,
      email,
      lastName,
      password,
      isActive
    } = createUserDto
    const saltRounds = 10;
    const existingUser = await this.usersRepository.findOne({
      where: {
        email
      }
    })
    
    if(existingUser){
      throw new HttpException('user id already exists',HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(
      password,
      saltRounds,
    );
    const user = this.usersRepository.save({
      ...createUserDto,
      password: hashedPassword
    })
    return user
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  };
  
  async findOneByLastName(lastName:string):Promise<User>{
    
    const user = await this.usersRepository
    .createQueryBuilder('user')
    .where('user.lastName =:lastName',{lastName})
    .getOne();
    if (!user){
      throw new NotFoundException(`user with this lastname not found`)
    }
    return user
  }
  
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
