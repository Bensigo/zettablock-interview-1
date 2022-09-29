import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Link {
  @Field()
  title: string;

  @Field()
  url: string;
}

@ObjectType()
export class ChatModel {
  @Field(() => [String], { nullable: true })
  mentions?: string[];

  @Field(() => [Link], { nullable: true })
  links?: Link[];

  @Field(() => [String], { nullable: true })
  emoticons?: string[];
}
