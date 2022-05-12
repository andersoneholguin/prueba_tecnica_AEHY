import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { ApiTags } from '@nestjs/swagger'


@ApiTags('Administrators')
@Controller('admin')
export class AdminController {

    constructor(
        private readonly adminService: AdminService
    ){}

    @Get()
    getAll(){
        return this.adminService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: number){
        return this.adminService.getOne(id)
    }

    @Post()
    createOne(@Body() body:any){
        return this.adminService.createOne(body)
    }
}
