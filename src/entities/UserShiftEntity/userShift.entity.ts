import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserShiftRequest } from '../UserShiftRequest/userShiftRequest.entity';
import { EventShift } from '../EventShiftEntity/eventShift.entity';
import { User } from '../UserEntity/user.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class UserShifts {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn()
  createTime: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userShifts)
  user: User;

  @Field(() => EventShift)
  @ManyToOne(() => EventShift, (eventShift) => eventShift.shiftRequests)
  eventShift: EventShift;
}
