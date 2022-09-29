import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class GetMessageArgs {
  @Field()
  @IsString()
  @IsOptional()
  mention?: string;
}
