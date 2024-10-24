import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { Reservation } from 'src/reservations/entities/reservation.entities';
@Entity({name:'Users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique:true})
  password:string;

  @Column({ default: true })
  isActive: boolean


  @OneToMany(() => Reservation, (reservation) => reservation.user)  // One-to-many with reservations
  reservations: Reservation[];

    async validatePassword(password:string):Promise<Boolean>{
    return bcrypt.compare(password,this.password)
  }
}


