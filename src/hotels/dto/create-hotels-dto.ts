 import { IsNotEmpty, IsString } from "class-validator";
export class createHotelsDto{
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    adress: string;

    @IsString()
    @IsNotEmpty()
    location: string
    static id: any;

}