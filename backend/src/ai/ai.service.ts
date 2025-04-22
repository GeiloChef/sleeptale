import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import * as process from "process";

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateStory(): Promise<{ title: string; sections: string[] }> {
    const prompt = `Erstelle eine kurze kinderfreundliche Geschichte. Dir ist überlassen worum es geht und wie sie aufgebaut ist.
    Es sollte sich als gute nacht geschichte eignen.
    Die Geschichte soll aus 6–10 kurzen Abschnitten bestehen, jeder Abschnitt ca. 3–5 Sätze. Antworte als JSON im folgenden Format:

{
  "title": "Der Titel",
  "sections": [
    "Abschnitt 1",
    "Abschnitt 2",
    ...
  ]
}`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = completion.choices[0].message.content;

    try {
      return JSON.parse(content || '');
    } catch (err) {
      throw new Error('Antwort konnte nicht gelesen werden.');
    }
  }
}
