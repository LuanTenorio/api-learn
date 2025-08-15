import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setValidation(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    transform: true,
    whitelist: true
  }));
}

function setSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Learn')
    .setDescription('Learn endpoint Documentation')
    .setVersion('1.0')
    .addTag('learn')
    .addBearerAuth({ type: "apiKey" })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).config.server.port;

  setValidation(app);
  setSwagger(app);
  app.enableCors();
  app.setGlobalPrefix("api");
  Logger.log(`Listening on port ${port}`, 'Bootstrap');

  await app.listen(port);
}

bootstrap();
