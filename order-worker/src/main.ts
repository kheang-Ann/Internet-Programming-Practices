import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // 1. Change .createMicroservice to .create to enable HTTP (GraphQL)
  const app = await NestFactory.create(AppModule);

  // 2. Connect RabbitMQ as a microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
      queue: 'orders_queue',
      queueOptions: { durable: false },
    },
  });

  // 3. Start the Microservice background tasks
  await app.startAllMicroservices();

  // 4. Start the HTTP server on port 3002 for the browser
  await app.listen(3002);

  console.log(`🚀 GraphQL server running at http://localhost:3002/graphql`);
}
bootstrap();
