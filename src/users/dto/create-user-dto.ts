import * as bcrypt from 'bcrypt'
import{IsString, isString} from 'class-validator'
export class CreateUserDto{
    readonly id:number;
    @IsString()
    firstName:string;
    @IsString()
    lastName:string;
    @IsString()
    password:string;
    
    isActive:boolean;
  static id: any;
  static lastName: any;
   
    
    async validatePassword(password:string):Promise<Boolean>{
        return bcrypt.compare(password,this.password)
      }
}