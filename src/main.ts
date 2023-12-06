import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CardSeeder } from '../prisma/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const prisma = new PrismaClient();

  await CardSeeder.run(prisma);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(8080);

  await prisma.$disconnect();
}

bootstrap();
