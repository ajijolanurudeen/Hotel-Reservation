import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany } from "typeorm";
import { Hotels } from "src/hotels/entity/hotels.entity";
import { Reservation } from "src/reservations/entities/reservation.entities";
@Entity({name:"rooms"})
export class Room{
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    name: string

    @Column()
    roomType: string

    @Column()
    floor: number

    @Column()
    isAvailable:boolean
    
    @Column()
    roomNumber: number

    @ManyToOne(() => Hotels, hotel => hotel.rooms)
    hotel: Hotels;
    
    @Column()
    hotelId: string

    @OneToMany(() => Reservation, (reservation) => reservation.room)  // One-to-many with reservations
    reservations: Reservation[];
  
}