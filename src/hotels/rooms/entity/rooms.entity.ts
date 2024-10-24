import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany } from "typeorm";
import { Hotels } from "src/hotels/entity/hotels.entity";
import { Reservation } from "src/reservations/entities/reservation.entities";
@Entity({name:"rooms"})
export class Room{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    name:string

    @Column()
    roomType:string

    @Column()
    floor:number

    @Column()
    isAvailable:boolean

    @ManyToOne(() => Hotels, hotel => hotel.rooms)
    hotel: Hotels;
    
    @Column()
    hotelId:number

    @OneToMany(() => Reservation, (reservation) => reservation.room)  // One-to-many with reservations
    reservations: Reservation[];
  
}