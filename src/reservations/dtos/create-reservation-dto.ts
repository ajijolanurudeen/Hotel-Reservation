import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateReservationDto {

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  roomId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

@IsNotEmpty()
@IsDateString()
endDate: string

  @IsNotEmpty()
  status: string;  // E.g., "confirmed", "pending", etc.
}