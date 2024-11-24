import { Module } from '@nestjs/common';
import {
  ClientOptions,
  ClientsModule,
  ClientsModuleAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransportService } from './transport.service';
import {
  NOTIFICATIONS_CHANNEL,
  TRANSPORT_CONNECTION,
  USERS_CHANNEL,
} from '../../config/constants';
import { RmqOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: TRANSPORT_CONNECTION,
        useFactory: async (configService: ConfigService) => {
          const user = configService.get('RABBIT_USER');
          const password = configService.get('RABBIT_PASSWORD');
          const host = configService.get('RABBIT_HOST');
          const delayTime = +configService.get('USER_CREATED_DELAY_TIME');

          const rabbitmqUrl = `amqp://${user}:${password}@${host}`;

          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitmqUrl],
              queue: USERS_CHANNEL,
              queueOptions: {
                durable: true,
                deadLetterExchange: '',
                deadLetterRoutingKey: NOTIFICATIONS_CHANNEL,
                messageTtl: delayTime,
              },
            },
          } as RmqOptions;
        },
        inject: [ConfigService],
      },
    ] as ClientsModuleAsyncOptions),
  ],
  providers: [TransportService],
  exports: [TransportService],
})
export class TransportModule {}
