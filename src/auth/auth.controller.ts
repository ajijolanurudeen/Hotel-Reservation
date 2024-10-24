import { Controller, Get, Post, Body, Patch, Param, Delete ,HttpCode,HttpStatus,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ok } from 'assert';
import { SigninDto } from './dto/Sign-In-User.dto';

import { User } from 'src/users/entity/user.entities';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SigninDto) {
    return this.authService.signIn(signInDto.lastName,signInDto.password);
  }

  @Post('profile')
  getProfile(@Request() req){
    return this.authService.profile(req.User.lastName)
  }

 }
