import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { User } from "src/users/entity/user.entities";
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers:[UsersController],
    providers:[UsersService],
    exports: [UsersService]
})
export class usersModule{}