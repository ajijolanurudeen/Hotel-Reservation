import { Controller,Get,Put,Post,Delete,Body, Param} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user-dto';
import { User } from '../entity/user.entities';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Get()
    async findAll():Promise<User[]>{
        return this.usersService.findAll();
    };

    @Get('lastName')
    async findOneByLastName(@Param('lastName')lastName):Promise<User>{
        return this.usersService.findOneByLastName(lastName)
    };

    @Post()
    create(@Body()createUserDto:CreateUserDto):Promise<User>{
        return this.usersService.createUser(createUserDto)
    }

    @Delete('id')
    delete(@Param('id')id):Promise<void>{
        return this.usersService.remove(id)
    }
}
