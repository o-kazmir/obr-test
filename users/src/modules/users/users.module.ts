import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { User } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportModule } from '../transport/transport.module';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TransportModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
