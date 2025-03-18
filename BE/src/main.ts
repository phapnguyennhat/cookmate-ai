import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      // forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: '*', // Cho phép tất cả domain (hoặc đặt cụ thể)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, // Nếu API yêu cầu cookie hoặc xác thực
  });


  await app.listen(configService.get('PORT')|| 3000);
}
bootstrap();
