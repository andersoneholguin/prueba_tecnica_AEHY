import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersController } from 'src/users/controllers/users.controller';
import { JwtAuthGuard, LocalAuthGuard } from '../guards';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger'


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @UseGuards(LocalAuthGuard)    
    @Post('login')
    async login(@Req() req: any ){

        const data = await this.authService.login(req.user)           
        return {
            message: 'Login exitoso',
            data
        }
        
    }



}
