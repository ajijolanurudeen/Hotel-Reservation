import { Controller,Get,Post,Delete,Param,Body,Request} from '@nestjs/common';
import { CreateReservationDto } from './dtos/create-reservation-dto';
import { Reservation } from './entities/reservation.entities';
import { ReservationService } from './reservations.service';
import { User } from 'src/users/entity/user.entities';
import { Room } from 'src/hotels/rooms/entity/rooms.entity';
@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService:ReservationService){}

    @Get()
    async findAll():Promise<Reservation[]>{
        return this.reservationsService.findAllReservations()
    }

    @Get('user')
    async findReservationsByUser(@Param('email') email: string){
        return this.reservationsService.findReservationsByUser(email)
    }

    @Get('room')
    async findReservationByRoom(@Param('roomNumber')roomNumber:number){
        return this.reservationsService.findReservationsByRoom(roomNumber)
    }

    @Post()
    create(@Body()CreateReservationDto:CreateReservationDto):Promise<Reservation>{
        return this.reservationsService.createReservation(CreateReservationDto)
    }



}
