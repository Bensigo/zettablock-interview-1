import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';

describe('chatService', () => {
  let service: ChatService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService],
      imports: [],
    }).compile();

    service = module.get(ChatService);
  });
  it('expect servic to be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create message successfully', async () => {
    const message = await service.createMessage({
      message: '@bob @john (success) such a cool feature',
    });
    expect(message.mentions[0]).toBe('bob');
    expect(message.emoticons[0]).toBe('success');
  });
});
