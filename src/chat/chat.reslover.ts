import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GetMessageArgs } from './dto/args/get-message.args';

import { CreateMessageInput } from './dto/inputs/create-message.input';
import { ChatService } from './chat.service';
import { ChatModel } from './model/chat.model';

@Resolver(() => ChatModel)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => ChatModel)
  async getMessage(@Args() query: GetMessageArgs) {
    return this.chatService.getMessage(query);
  }

  @Mutation(() => ChatModel)
  async createMessage(
    @Args('input') input: CreateMessageInput,
  ): Promise<ChatModel> {
    return this.chatService.createMessage(input);
  }
}
