import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entities';
import { CreateReservationDto } from './dtos/create-reservation-dto';
import { User } from 'src/users/entity/user.entities';
import { Room } from 'src/hotels/rooms/entity/rooms.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  // Create a new reservation
  async createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const { userId, roomId, startDate,endDate, status } = createReservationDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new Error('User not found');

    const room = await this.roomRepository.findOne({ where: { id: roomId }, relations: ['hotel'] });
 // Get the room with hotel
    if (!room) throw new Error('Room not found');

    const reservation = this.reservationRepository.create({
      user,
      room,
      startDate,
      endDate,
      status,
    });

    return this.reservationRepository.save(reservation);
  }

  // Find reservations by user
  async findReservationsByUser(userId: number): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'room', 'room.hotel'],  // Include the room and its hotel
    });
  }

  // Find reservations by room
  async findReservationsByRoom(roomId: number): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { room: { id: roomId } },
      relations: ['user', 'room', 'room.hotel'],  // Include room and its hotel
    });
  }

  // Find all reservations
  async findAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      relations: ['user', 'room', 'room.hotel'],  // Include user, room, and hotel
    });
  }
}