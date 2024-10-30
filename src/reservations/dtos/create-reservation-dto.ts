import { IsNotEmpty, IsDateString, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  roomNumber: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

@IsNotEmpty()
@IsDateString()
endDate: string

  @IsNotEmpty()
  status: string;  // E.g., "confirmed", "pending", etc.
}