import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../../auth/guards'
import { ApiTags } from '@nestjs/swagger'
import { userDto, findParamsDto } from '../dto/index'
import { ValidationPipe } from '@nestjs/common'


@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAll()
    }

    @UseGuards(JwtAuthGuard) 
    @Get(':id')
    getOne(@Param('id') id:number){
        
        return this.usersService.getOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({
        transform: true,
        whitelist: true
    }))   
    createOne(@Body() body: userDto){                      
        return this.usersService.createOne(body)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')            
    updateOne(@Param('id') id: number, @Body() body:userDto){        
        return this.usersService.updateOne(id, body)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: number){
        return this.usersService.deleteOne(id)
    }
}
