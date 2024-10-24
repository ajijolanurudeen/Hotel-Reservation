import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { Hotels } from './entity/hotels.entity';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { ReservationService } from 'src/reservations/reservations.service';
@Module({
  imports:[TypeOrmModule.forFeature([Hotels]), RoomsModule, ReservationsModule],
  controllers: [HotelsController],
  providers: [HotelsService, ]
})
export class HotelsModule {}
