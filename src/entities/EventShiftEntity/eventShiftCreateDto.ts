import { IsDateString, IsEmail, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EventShiftCreateDto {
  @Field()
  @IsDateString()
  startTime: string;

  @Field()
  @IsDateString()
  endTime: string;

  @Field()
  @IsString()
  name: string;
}
