import { Controller,Post,Get,Put,Delete,Request,Body, Param } from '@nestjs/common';
import { createHotelsDto } from './dto/create-hotels-dto';
import { HotelsService } from './hotels.service';
import { Hotels } from './entity/hotels.entity';
@Controller('hotels')
export class HotelsController {
    constructor(private readonly hotelsService:HotelsService){}
@Get()
async findAll():Promise<Hotels[]>{
    return this.hotelsService.findAll()
}

// @Get('name')
// async findOneByHotelName(@Param('name')name):Promise<Hotels>{
//     return this.hotelsService.findOneByHotelName(name)
// }

@Get('name')
async findOne(@Param('name')name):Promise<Hotels>{
    return this.hotelsService.findOne(name)
}

@Post()
create(@Body()createHotelsDto:createHotelsDto):Promise<Hotels>{
    return this.hotelsService.createHotels(createHotelsDto)
}

@Delete()
delete(@Param('id')id):Promise<void>{
    return this.hotelsService.delete(id)
}
}
