import { Injectable } from '@nestjs/common';
import { NotificationTypes } from '../constants';
import { Notification } from '../models/notification.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

type NotificationData = {
  [NotificationTypes.Welcome]: { userName: string; userId: string };
};

@Injectable()
export class NotificationsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
    private readonly configService: ConfigService,
  ) {}

  hydrateNotification<K extends NotificationTypes>(
    notificationType: K,
    data: NotificationData[K],
  ): {
    type: K;
    body: string;
    userId: string;
  } {
    switch (notificationType) {
      case NotificationTypes.Welcome:
        // HERE WILL BE USED SOME NOTIFICATION TEMPLATE
        return {
          type: notificationType,
          body: `Hello ${data.userName}!`,
          userId: data.userId,
        };

      // Other notification types can be handled here
    }
  }

  async saveNotification(
    data: Pick<Notification, 'type' | 'body' | 'userId'>,
  ): Promise<Notification> {
    const createdNotification = new this.notificationModel(data);

    return createdNotification.save();
  }

  async sendPushNotification(data: Notification): Promise<void> {
    const pushNotificationsChannel = this.configService.get(
      'PUSH_NOTIFICATIONS_CHANNEL',
    );

    await this.httpService.axiosRef.post(pushNotificationsChannel, data);
  }
}
