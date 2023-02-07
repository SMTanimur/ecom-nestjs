import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';
import { Global, Module } from '@nestjs/common';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET_KEY: Joi.string().required(),
        DESCRIPTION: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        PORT: Joi.number().required(),
        BRAND_NAME: Joi.string().required(),
        WEB_URL: Joi.string().required(),
        API_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
