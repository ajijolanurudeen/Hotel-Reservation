import { Entity,Column,PrimaryGeneratedColumn,OneToMany} from "typeorm";
import { Room } from "../rooms/entity/rooms.entity";
@Entity({ name: 'Hotels' })
export class Hotels{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    adress: string;

    @Column()
    location: string

    @OneToMany(() => Room, room => room.hotel)
    rooms: Room[];
}