 import { IsString } from "class-validator";
export class createHotelsDto{
    readonly id:number;
    
    @IsString()
    name:string;

    @IsString()
    adress:string;

    @IsString()
    location:string
    static id: any;

}