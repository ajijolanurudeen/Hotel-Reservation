import { Injectable,HttpException,HttpCode,HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotels } from './entity/hotels.entity';
import { createHotelsDto } from './dto/create-hotels-dto';
import { hotelInterface } from './interfaces/hotel.interfaces';
@Injectable()
export class HotelsService {
    constructor(@InjectRepository(Hotels)
private hotelsRepository:Repository<Hotels>
){}

async createHotels(createHotelsDto:hotelInterface):Promise<Hotels>{
    
    const {
        name,
        adress,
        location
    }=createHotelsDto;
    const hotelAlreadyExists=await this.hotelsRepository.findOne({
        where:{
            name
        }
    })
    if(hotelAlreadyExists){
        throw new HttpException('hotel id already exists',HttpStatus.BAD_REQUEST);
      }
      
      const hotel =this.hotelsRepository.save({
        ...createHotelsDto
    })
  
      return hotel
}

findAll():Promise<Hotels[]>{
    return this.hotelsRepository.find()
}

async findOne(name: string): Promise<Hotels | null> {
    try {
        const hotel = await this.hotelsRepository.findOne({ where:{name }});
        return hotel;
    } catch (error) {
        console.error('Error fetching hotel:', error);
        throw new Error('Unable to retrieve hotel');
    }
}
async delete(id:number):Promise<void>{
    await this.hotelsRepository.delete(id)
}
}
