import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  message: string;
}
