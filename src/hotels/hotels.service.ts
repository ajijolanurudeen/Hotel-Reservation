import { Injectable,HttpException,HttpCode,HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotels } from './entity/hotels.entity';
import { createHotelsDto } from './dto/create-hotels-dto';
@Injectable()
export class HotelsService {
    constructor(@InjectRepository(Hotels)
private hotelsRepository:Repository<Hotels>
){}

async createHotels(createHotelsDto:createHotelsDto):Promise<Hotels>{
    
    const hotelId=createHotelsDto.id;
    const hotelAlreadyExists=await this.hotelsRepository
    .createQueryBuilder('hotel')
    .where('hotel.id=:hotelId',{hotelId})
    .getOne();
    if(hotelAlreadyExists){
        throw new HttpException('hotel id already exists',HttpStatus.BAD_REQUEST);
      }
      
      const hotel =this.hotelsRepository.create(createHotelsDto)
  
      await this.hotelsRepository.save(hotel);
      return hotel
}

findAll():Promise<Hotels[]>{
    return this.hotelsRepository.find()
}

// async findOneByHotelName(name:string):Promise<Hotels>{

//     const hotel = await this.hotelsRepository
//     .createQueryBuilder('hotel')
//     .where('hotel.name =:name',{name})
//     .getOne()
//     if(!hotel){
//         throw new NotFoundException(`hotel with this name '${name}'not found`)
//     }
//     return hotel
// }

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
