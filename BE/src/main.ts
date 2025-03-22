import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NextFunction, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      // forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: false,
      whitelist: true,
    }),
  );

  app.enableCors();


  await app.listen(configService.get('PORT')|| 3000);
}
bootstrap();
