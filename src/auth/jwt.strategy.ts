import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return {
      userID: payload.userID,
      userName: payload.userName,
      userRole: payload.userRole,
    };
  }
}
