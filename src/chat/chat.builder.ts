import { ChatModel } from './model/chat.model';
import { ParserService } from './parser.service';

export class ChatBuilder {
  private message: ChatModel;
  private parser: ParserService;
  private text: string;
  constructor(text: string) {
    this.message = new ChatModel();
    this.text = text;
    this.parser = new ParserService();
  }
  setMentions() {
    // parse text for mentions
    const mentions = this.parser.getMentions(this.text);
    this.message.mentions = mentions;
    return this;
  }

  setEmoticons() {
    // parse text for emoticons
    const emoticons = this.parser.getEmoticons(this.text);
    this.message.emoticons = emoticons;
    return this;
  }

  async setLinks() {
    const data = await this.parser.getLinks(this.text);
    this.message.links = data;
    return this;
  }

  async build() {
    return this.message;
  }
}
