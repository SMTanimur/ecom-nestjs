import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PassportModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
