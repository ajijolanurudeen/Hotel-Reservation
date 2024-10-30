import { IsNotEmpty, IsString } from "class-validator";
export class CreateRoomDto {
  
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    roomType: string;
    
    @IsNotEmpty()
    floor: number;
      
    @IsNotEmpty()
    isAvailable: boolean;

    @IsNotEmpty()
    roomNumber:number
    
    @IsNotEmpty()
    hotelId: string;
  }