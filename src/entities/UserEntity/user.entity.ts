import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserShiftRequest } from '../UserShiftRequest/userShiftRequest.entity';
import { UserShifts } from '../UserShiftEntity/userShift.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Field()
  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @Field()
  @Column({
    nullable: false,
    default: '',
  })
  phone: string;

  @Field(() => [UserShiftRequest], { nullable: true }) // Make shiftRequests optional
  @OneToMany(() => UserShiftRequest, (request) => request.user)
  shiftRequests: UserShiftRequest[];

  @Field(() => [UserShifts], { nullable: true }) // Make shiftRequests optional
  @OneToMany(() => UserShifts, (shift) => shift.user)
  userShifts: UserShifts[];
}
