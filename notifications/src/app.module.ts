import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationsController } from './controllers/notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsService } from './services/notifications.service';
import { Notification, NotificationSchema } from './models/notification.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],

  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class AppModule {}
