import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../auth/guards'


@ApiTags('Administrators')
@Controller('admin')
export class AdminController {

    constructor(
        private readonly adminService: AdminService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.adminService.getAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(@Param('id') id: number){
        return this.adminService.getOne(id)
    }
    
    /** 
    @Post()
    createOne(@Body() body:any){
        return this.adminService.createOne(body)
    }
    */
}
