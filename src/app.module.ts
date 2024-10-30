
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config'
import { DataSource } from 'typeorm';
import { Repository } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/services/users.service';
import { usersModule } from './users/users.module';
import { User } from './users/entity/user.entities';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { HotelsController } from './hotels/hotels.controller';
import { HotelsService } from './hotels/hotels.service';
import { Hotels} from './hotels/entity/hotels.entity';
import { Room } from './hotels/rooms/entity/rooms.entity';
import { RoomsModule } from './hotels/rooms/rooms.module';
import { RoomsService } from './hotels/rooms/rooms.service';
import { RoomsController } from './hotels/rooms/rooms.controller';
import { ReservationsModule } from './reservations/reservations.module';
import { ReservationService } from './reservations/reservations.service';
import { Reservation } from './reservations/entities/reservation.entities';
import { ReservationsController } from './reservations/reservations.controller';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User,Hotels,Room,Reservation],
      synchronize:true
    }),
    usersModule,
    AuthModule,
    HotelsModule,
    RoomsModule,
    ReservationsModule
  ],
  controllers:[AppController, ],
  providers:[AppService,],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}