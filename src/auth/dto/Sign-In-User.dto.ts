import { User } from "src/users/entity/user.entities";
import { IsString } from "class-validator";
import { user } from "src/users/services/users.service";
export class SigninDto{
    @IsString()
    readonly lastName:string;
    @IsString()
    readonly password:string;
}