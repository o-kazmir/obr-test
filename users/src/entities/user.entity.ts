import {
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from './abstract/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;
}
