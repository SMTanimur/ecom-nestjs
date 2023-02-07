import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  get BRAND_NAME() {
    return this.configService.get<string>('BRAND_NAME');
  }

  get API_URL() {
    return this.configService.get<string>('API_URL');
  }

  get WEB_URL() {
    return this.configService.get<string>('WEB_URL');
  }
  get PORT() {
    return this.configService.get<number>('PORT');
  }

  get MONGODB_URI() {
    return this.configService.get<string>('MONGODB_URI');
  }

  get DOCSBASE_URL() {
    return this.configService.get<string>('DOCSBASE_URL');
  }

  get JWT_SECRET_KEY() {
    return this.configService.get<string>('JWT_SECRET_KEY');
  }

  get DESCRIPTION() {
    return this.configService.get<string>('DESCRIPTION');
  }

  get EXPIRES_KEY() {
    return this.configService.get<string>('EXPIRES_KEY');
  }

  get EXPIRES_LIVE() {
    return this.configService.get<number>('EXPIRES_LIVE');
  }

  get API_VERSION() {
    return this.configService.get<string>('API_VERSION');
  }
}
