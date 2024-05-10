import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Set global prefix for all routes
   */
  app.setGlobalPrefix('payment');

  /**
   * setting cors
   */
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  /**
   * helmet enabled for security
   */
  app.use(helmet());

  /**
   * swagger configuration for documentation api
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Payment Service API')
    .setDescription('API for payment management, such as send and withdraw.')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('payment/docs', app, document);

  /**
   * setting port
   */
  await app.listen(5002);
}
bootstrap();
