import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from './entity/rooms.entity';
import { HotelsModule } from '../hotels.module';
import { Hotels } from '../entity/hotels.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Room,Hotels])],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}
