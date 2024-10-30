import { PrimaryGeneratedColumn,Column,ManyToOne,OneToMany,ManyToMany, Entity } from "typeorm";
import { User } from "src/users/entity/user.entities";
import { Room } from "src/hotels/rooms/entity/rooms.entity";
import { timeStamp } from "console";
@Entity({name:'reservations'})
export class Reservation{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'timestamp'})
    startDate:Date;

    @Column({type:'timestamp'})
    endDate:Date;

    @Column()
    status:string;

    @Column()
    email:string

    @Column()
    roomNumber:number
    
    @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })  // Link to User
    user: User;
  
    @ManyToOne(() => Room, (room) => room.reservations, { onDelete: 'CASCADE' })  // Link to Room
    room: Room;
  
}