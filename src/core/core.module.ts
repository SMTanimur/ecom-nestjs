import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';
import { ConfigurationService } from 'src/configuration/configuration.service';
// @Global()
@Module({
  imports: [
    PassportModule.register({ session: true }),
    {
      ...JwtModule.registerAsync({
        useFactory: async (configurationService: ConfigurationService) => ({
          secret: configurationService.JWT_SECRET_KEY,
          signOptions: { expiresIn: '1d' },
        }),
        inject: [ConfigurationService],
      }),
      global: true,
    },
  ],

  exports: [JwtModule],
})
export class CoreModule {}
