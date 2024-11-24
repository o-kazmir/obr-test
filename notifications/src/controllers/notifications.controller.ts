import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Events, NotificationTypes } from '../constants';
import { NotificationsService } from '../services/notifications.service';
import { UserCreatedEvent } from '../events/user.created';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern({ cmd: Events.UserCreated })
  async handleUserCreation(data: UserCreatedEvent): Promise<void> {
    const hydratedNotification = this.notificationsService.hydrateNotification(
      NotificationTypes.Welcome,
      { userName: data.name, userId: data.id },
    );

    this.notificationsService.sendPushNotification(hydratedNotification);

    await this.notificationsService.saveNotification(hydratedNotification);
  }
}
