import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entities';
import { UsersService } from 'src/users/services/users.service';
import { SigninDto } from './dto/Sign-In-User.dto';
import * as bcrypt from 'bcrypt'
import { access } from 'fs';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository:Repository<User>,
    private usersService:UsersService,
    private JwtService:JwtService
  ){}

async signIn(lastName,password:string):Promise<any> {
  console.log('Attempting to sign in with lastName:', lastName);
  const user = await this.usersService.findOneByLastName(lastName);

  if (!user) {
    throw new UnauthorizedException('Invalid username or password');
  }

  const passwordIsValid = await bcrypt.compare(password,user.password);

  if (!passwordIsValid) {
    throw new UnauthorizedException('Invalid username or password');
  }

  const payload = { lastName: user.lastName, id:user.id};
  return{
     accessToken : await this.JwtService.signAsync(payload),
  }

}
async profile(lastName:string):Promise<User>{
  return this.usersService.findOneByLastName(lastName)
}


}