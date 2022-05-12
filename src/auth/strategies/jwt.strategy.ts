import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminService } from 'src/admin/services/admin.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(        
        private adminService: AdminService,
        private config: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreException: false,
            secretOrKey: config.get<string>('JWT_SECRET')
        });
    }

    async validate(payload: any){        
        const {id: id} = payload;        
        return await this.adminService.getOne(id)
        
    }
}
