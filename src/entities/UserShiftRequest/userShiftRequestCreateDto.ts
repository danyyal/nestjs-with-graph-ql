import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { ShiftStatus } from './userShiftRequest.entity';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ShiftRequestCreateDto {
  @Field()
  @IsUUID()
  @IsString()
  userId: string;

  @Field()
  @IsUUID()
  @IsString()
  eventShiftId: string;

  @Field()
  @IsString()
  @IsEnum(ShiftStatus)
  status: string;
}

@InputType()
export class ShiftRequestUpdateDto {
  @Field()
  @IsString()
  @IsEnum(ShiftStatus)
  status: ShiftStatus;
}
