import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entity/user.entities';
import { AuthGuard } from './auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[
    usersModule,
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forFeature([User]),
    usersModule,
    JwtModule.register({
      global:true,
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn:'60s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersService],
  exports:[AuthService]
})
export class AuthModule {}
