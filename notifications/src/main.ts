import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { CHANNEL } from './constants';

async function bootstrap() {
  const rabbitmqUrl = `amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_HOST}`;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        queue: CHANNEL,
        urls: [rabbitmqUrl],
      },
    },
  );

  await app.listen();
}
bootstrap();
