import { IsEmail, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserCreateDto {
  @Field()
  @IsString()
  name: string;
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsString()
  phone: string;
}
