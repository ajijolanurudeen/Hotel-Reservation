import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './reservations.controller';
import { ReservationService } from './reservations.service';
import { Reservation } from './entities/reservation.entities';
import { Hotels } from 'src/hotels/entity/hotels.entity';
import { Room } from 'src/hotels/rooms/entity/rooms.entity';
import { User } from 'src/users/entity/user.entities';
@Module({
  imports:[TypeOrmModule.forFeature([Reservation,Room,Hotels,User])],
  controllers: [ReservationsController],
  providers:[ReservationService]
})
export class ReservationsModule {}
