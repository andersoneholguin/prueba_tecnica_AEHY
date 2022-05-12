import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/services/admin.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    
    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService
    ){}
    
    async validateUser(email: string, pass: string): Promise<any>{
        const user = await this.adminService.findByEmail(email)        

        if(user && pass === user.password){            
            return user
        }
        return null
    }

    login(user: any){
        
        const { id, ...rest } = user;
        const payload = { id: id };
        return {
            ...rest,
            accessToken: this.jwtService.sign(payload)
        }
    }
}
