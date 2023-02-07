/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as config from 'config';
import { ConfigurationService } from './configuration/configuration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configurationService =
    app.get<ConfigurationService>(ConfigurationService);

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('ecom-Ecommerce API')
    .setDescription('The ecom API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(configurationService.API_URL)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(configurationService.PORT);
}
bootstrap();
