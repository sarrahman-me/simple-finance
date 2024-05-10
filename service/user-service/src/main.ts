import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Set global prefix for all routes
   */
  app.setGlobalPrefix('user');

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
    .setTitle('User Service API')
    .setDescription(
      'API for user management, such as registration, login, and user profile management.',
    )
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('user/docs', app, document);

  /**
   * Cek koneksi ke rabbitmq
   */
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_HOST],
      queue: 'user_service',
      queueOptions: {
        durable: true,
      },
    },
  });

  /**
   * Start REST API server
   */
  await app.listen(5001);

  /**
   * Start consuming messages from RabbitMQ
   */
  await app.startAllMicroservices();
}
bootstrap();
