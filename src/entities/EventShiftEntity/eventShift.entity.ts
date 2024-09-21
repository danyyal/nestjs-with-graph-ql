import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserShiftRequest } from '../UserShiftRequest/userShiftRequest.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class EventShift {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    type: 'timestamptz',
  })
  startTime: Date;

  @Field()
  @Column({
    type: 'timestamptz',
  })
  endTime: Date;

  @Field()
  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Field(() => [UserShiftRequest])
  @OneToMany(() => UserShiftRequest, (userShift) => userShift.eventShift)
  shiftRequests: UserShiftRequest[];
}
