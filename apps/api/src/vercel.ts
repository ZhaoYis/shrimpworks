import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import express from 'express';
import type { Request, Response } from 'express';
import { AppModule } from './app.module';

// Cache the NestJS app instance
let cachedApp: ReturnType<typeof NestFactory.create>;

async function createApp() {
  if (cachedApp) {
    return cachedApp;
  }

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  // Get configuration
  const configService = app.get(ConfigService);
  const prefix = configService.get<string>('API_PREFIX', 'api/v1');

  // Global prefix
  app.setGlobalPrefix(prefix);

  // Enable CORS
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ShrimpWorks API')
    .setDescription('Enterprise SaaS Factory Platform API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // Health check endpoint
  app.getHttpAdapter().get('/health', (_req: Request, res: Response) => {
    res.status(200).send('OK');
  });

  await app.init();
  cachedApp = Promise.resolve(app);

  return cachedApp;
}

// Vercel serverless handler
export default async function handler(req: Request, res: Response) {
  const app = await createApp();
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
}
