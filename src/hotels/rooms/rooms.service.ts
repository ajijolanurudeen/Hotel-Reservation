import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entity/rooms.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateRoomDto } from './create-rooms-dto/create-rooms-dto';
import { roomInterface } from './interfaces/room.interface';

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room)
    private roomrepository: Repository<Room>){}

async createRoom(CreateRoomDto: roomInterface):Promise<Room>{
    const {
        roomType,
        name,
        floor,
        isAvailable,
        hotelId
    }= CreateRoomDto;
    const roomAlreadyExists = await this.roomrepository.findOne({
        where:{
            name
        }
    })
    
    if(roomAlreadyExists){
        throw new HttpException('this room already exists',HttpStatus.BAD_REQUEST);

    }
    const room= this.roomrepository.save({
        ...CreateRoomDto
    })

    return room
}

findAll():Promise<Room[]>{
    return this.roomrepository.find()
}

async findOne(name: string):Promise<Room|null>{
    try{
        const room = await this.roomrepository.findOne({where:{name}})
        return room;
    }
    catch(error){
        console.error('error fetching room',error);
        throw new Error('unable to retrieve room')
    }
}

async findByfloor(floor:number):Promise<Room|null>{
    try{
        const room = await this.roomrepository.findOne({where:{floor}})
        return room
    }catch(error){
        console.error('error fetching room by floor',error)
        throw new Error('unable to retrive room by floor')
    }
}

async findByIsAvailable(isAvailable:boolean):Promise<Room|null>{
    try{
        const room = await this.roomrepository.findOne({where:{isAvailable}})
        return room
    }catch(error){
        console.error('error getting room by availability',error)
        throw new Error('unable to retrieve room by availability')
    }
}

async delete(id:number):Promise<void>{
    await this.roomrepository.delete(id)
}
}
