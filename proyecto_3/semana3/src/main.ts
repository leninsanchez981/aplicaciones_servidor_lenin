import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ProblemaFilter } from './problema/problema.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new ProblemaFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();