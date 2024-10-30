import * as bcrypt from 'bcrypt'
import{isNotEmpty, IsNotEmpty, IsString, isString} from 'class-validator'
export class CreateUserDto{
    
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    isActive:boolean;
  static id: any;
  static lastName: any;
   
    
    async validatePassword(password:string):Promise<Boolean>{
        return bcrypt.compare(password,this.password)
      }
}