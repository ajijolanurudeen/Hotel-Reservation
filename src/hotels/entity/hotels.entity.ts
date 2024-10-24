import { Entity,Column,PrimaryGeneratedColumn,OneToMany} from "typeorm";
import { Room } from "../rooms/entity/rooms.entity";
@Entity({ name: 'Hotels' })
export class Hotels{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    adress:string;

    @Column()
    location:string

    @OneToMany(() => Room, room => room.hotel)
    rooms: Room[];
}