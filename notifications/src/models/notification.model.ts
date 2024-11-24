import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { NotificationTypes } from '../constants';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ collection: 'notifications' })
export class Notification {
  @Prop({ type: String, enum: NotificationTypes, required: true })
  type: NotificationTypes;

  @Prop()
  body: string;

  @Prop()
  userId: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
