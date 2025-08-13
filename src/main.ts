import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';

function setValidation(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    transform: true,
    whitelist: true
  }));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).config.server.port;

  setValidation(app);
  app.setGlobalPrefix("api");
  Logger.log(`Listening on port ${port}`, 'Bootstrap');

  await app.listen(port);
}

bootstrap();
