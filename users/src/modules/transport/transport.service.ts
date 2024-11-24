import { Inject, Injectable } from '@nestjs/common';
import { Events, TRANSPORT_CONNECTION } from '../../config/constants';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import * as process from 'process';

@Injectable()
export class TransportService {
  constructor(
    @Inject(TRANSPORT_CONNECTION) private usersChannelClient: ClientProxy,
  ) {}

  async emitDelayedEvent<T>(e: Events, data: T) {
    this.usersChannelClient.emit({ cmd: e }, data);
  }
}
