import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../../entities/user.entity';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos';
import { Events } from '../../../config/constants';
import { TransportService } from '../../transport/transport.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly transportService: TransportService,
  ) {}

  @Post()
  async createOne(@Body() body: CreateUserDto): Promise<{ data: User }> {
    const user = await this.usersService.createOne({ name: body.name });

    this.transportService.emitDelayedEvent<User>(Events.UserCreated, user);

    return {
      data: user,
    };
  }
}
