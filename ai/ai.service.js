"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const process = require("process");
let AiService = class AiService {
    constructor() {
        this.openai = new openai_1.OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async generateStory() {
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
        }
        catch (err) {
            throw new Error('Antwort konnte nicht gelesen werden.');
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AiService);
//# sourceMappingURL=ai.service.js.map