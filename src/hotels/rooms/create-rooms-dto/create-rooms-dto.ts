import { IsString } from "class-validator";
export class CreateRoomDto {
    
    id:number
    
    name: string;
    
    roomType: string;
    
    floor: number;
      
    isAvailable: boolean;
    
    hotelId: number;
  }