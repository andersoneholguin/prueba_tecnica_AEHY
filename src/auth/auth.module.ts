import { Module } from '@nestjs/common';
import {PassportModule} from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import { LocalStrategy, JwtStrategy } from './strategies/';
import { ConfigService } from '@nestjs/config'


@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '60m'}
      })     
    }),
    AdminModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
