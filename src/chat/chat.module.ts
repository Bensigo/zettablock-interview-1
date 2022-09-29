import { Module } from '@nestjs/common';

import { ChatResolver } from './chat.reslover';
import { ChatService } from './chat.service';

@Module({
  imports: [],
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
