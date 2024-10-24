import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entities';
import { CreateUserDto } from '../dto/create-user-dto';
import * as bcrypt from 'bcrypt'
import { SigninDto } from 'src/auth/dto/Sign-In-User.dto';
import { NotFoundError } from 'rxjs';

export type user =any
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  async createUser(createUserDto:CreateUserDto):Promise<User>{
    const saltRounds = 10;
    const userId = createUserDto.id;
    const existingUser = await this.usersRepository
    .createQueryBuilder('user')
    .where('user.id=:userId', { userId: userId })
    .select(['user.id'])
    .getOne();
    if(existingUser){
      throw new HttpException('user id already exists',HttpStatus.BAD_REQUEST);
    }
    createUserDto.password= await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const user =this.usersRepository.create(createUserDto)

    await this.usersRepository.save(user);
    return user
  }
  // async create(user:User){
  //   const User = this.usersRepository.create(user)
  //   return await this.usersRepository.save(User);
  // };

  // async create(SigninDto:SigninDto):Promise<User>{
  //   const {lastName,password}=SigninDto
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(password, salt);

  //   const user = new User();
  //   user.lastName = lastName;
  //   user.password = hashedPassword;

  //   return this.usersRepository.save(user);
  // }

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
