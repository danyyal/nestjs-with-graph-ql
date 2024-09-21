import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../UserEntity/user.entity';
import { EventShift } from '../EventShiftEntity/eventShift.entity';
import { ObjectType, Field } from '@nestjs/graphql';

export enum ShiftStatus {
  UNSCHEDULED = 'UNSCHEDULED',
  SCHEDULED = 'SCHEDULED',
}
@Entity()
@ObjectType()
export class UserShiftRequest {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn()
  createTime: Date;

  @Field()
  @Column({
    type: 'enum',
    enum: ShiftStatus,
    default: ShiftStatus.UNSCHEDULED,
  })
  status: ShiftStatus;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.shiftRequests)
  user: User;

  @Field(() => EventShift, { nullable: true })
  @ManyToOne(() => EventShift, (eventShift) => eventShift.shiftRequests)
  eventShift: EventShift;
}
