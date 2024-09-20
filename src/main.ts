import { NestFactory } from '@nestjs/core';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
//
async function bootstrap() {
  const globalPrefix = process.env.GLOBAL_PREFIX;
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('This is the API documentation for the NestJS Boilerplate')
    .setVersion('1.0')
    .addBearerAuth() // Adding Bearer token authentication for protected routes
    .build();

  // Create the Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI at a specified endpoint (e.g., /api/docs)
  SwaggerModule.setup('api/docs', app, document);

  // Start the application
  await app.listen(3000);

}
bootstrap();
