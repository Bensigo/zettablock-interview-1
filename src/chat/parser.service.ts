import * as cheerio from 'cheerio';
import { ScrapingBeeClient } from 'scrapingbee';
import { configuration } from './config/configuration';

const client = new ScrapingBeeClient(configuration.apiKey);

export class ParserService {
  getMentions(msg: string): string[] {
    // this runs at a time complexity of O(n) and space complexity of O(1)
    // return an array of mentions
    const mentions = [];
    const msgArray = msg.split(' ');
    for (const txt of msgArray) {
      if (txt[0] === '@' && txt.length > 1) {
        const name = txt.slice(1);
        mentions.push(name);
      }
    }
    return mentions;
  }

  getEmoticons(msg: string) {
    // this runs at a time complexity of O(n) and space complexity of O(1)
    const emoticons = [];
    const msgArray = msg.split(' ');
    for (const txt of msgArray) {
      if (txt[0] === '(' && txt.length < 15) {
        const emoticon = txt.slice(1, -1);
        emoticons.push(emoticon);
      }
    }
    return emoticons;
  }

  async getLinks(msg: string) {
    const result = [];
    const msgArray = msg.split(' ');
    for (const txt of msgArray) {
      const isLink = new RegExp('^(http?|ftp?|https)://');
      if (isLink.test(txt)) {
        const url = txt;
        const res = await client.get({ url });
        const decoder = new TextDecoder();
        const text = decoder.decode(res.data);
        const $ = cheerio.load(text);
        const title = $('title').text();
        result.push({ url, title });
      }
    }
    return Promise.all(result);
  }
}
