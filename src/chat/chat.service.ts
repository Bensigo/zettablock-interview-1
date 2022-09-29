import { Injectable } from '@nestjs/common';
import { ChatBuilder } from './chat.builder';
import { GetMessageArgs } from './dto/args/get-message.args';
import { CreateMessageInput } from './dto/inputs/create-message.input';
import { ChatModel } from './model/chat.model';

@Injectable()
export class ChatService {
  private messages: ChatModel[] = [
    {
      mentions: ['Ben', 'Adin', 'success'],
      emoticons: ['success'],
      links: [
        {
          title: 'Hello world',
          url: 'https://helloworld.com',
        },
      ],
    },
  ];
  async createMessage(input: CreateMessageInput) {
    const builder = new ChatBuilder(input.message);
    const message = (
      await builder.setMentions().setEmoticons().setLinks()
    ).build();
    return message;
  }

  async getMessage(query: GetMessageArgs) {
    const mention = query.mention;
    return this.messages.filter((msg) => msg.mentions.includes(mention))[0];
  }
}
