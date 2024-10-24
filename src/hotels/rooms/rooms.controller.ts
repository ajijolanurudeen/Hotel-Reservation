import { Controller ,Post,Get,Delete,Param,Request,Body} from '@nestjs/common';
import { CreateRoomDto } from './create-rooms-dto/create-rooms-dto';
import { RoomsService } from './rooms.service';
import { Room } from './entity/rooms.entity';
@Controller('rooms')
export class RoomsController {
    constructor(private readonly RoomsService:RoomsService){}

@Get()
async findAll():Promise<Room[]>{
    return this.RoomsService.findAll()
}
@Get('name')
async findOne(@Param('name')name):Promise<Room>{
    return this.RoomsService.findOne(name)
}
@Get('floor')
async findByFloor(@Param('floor')floor):Promise<Room>{
    return this.RoomsService.findByfloor(floor)
}

@Get('Available')
async findByIsAvailable(@Param('isAvailable')isAvailable):Promise<Room>{
    return this.RoomsService.findByIsAvailable(isAvailable)
}

@Post()
create(@Body()CreateRoomDto:CreateRoomDto):Promise<Room>{
    return this.RoomsService.createRoom(CreateRoomDto)
}
@Delete()
delete(@Param('id')id):Promise<void>{
    return this.RoomsService.delete(id)
}
}
