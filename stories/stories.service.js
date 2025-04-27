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
exports.StoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ai_service_1 = require("../ai/ai.service");
let StoriesService = class StoriesService {
    constructor(prisma, aiService) {
        this.prisma = prisma;
        this.aiService = aiService;
    }
    async create(title, content) {
        return this.prisma.story.create({
            data: {
                title,
                sections: {
                    create: [{ text: 'test2', order: 1 }],
                }
            },
        });
    }
    async createTest() {
        return this.prisma.story.create({
            data: {
                title: 'Gute Nacht, Emely',
                sections: {
                    create: [
                        { text: 'Es war einmal eine kleine Schildkröte...', order: 1 },
                        { text: 'Sie lebte in einem funkelnden Teich...', order: 2 },
                    ],
                },
            },
            include: { sections: true },
        });
    }
    async findAll() {
        return this.prisma.story.findMany();
    }
    async assignScheduledDate(storyId, date) {
        return this.prisma.story.update({
            where: { id: storyId },
            data: { scheduledAt: date },
        });
    }
    async getStoryForToday() {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        const todayStory = await this.prisma.story.findFirst({
            where: {
                scheduledAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            include: {
                sections: {
                    orderBy: { order: 'asc' },
                },
            },
        });
        if (todayStory)
            return todayStory;
        const unscheduled = await this.prisma.story.findFirst({
            where: {
                scheduledAt: null,
            },
            orderBy: { createdAt: 'asc' },
            include: {
                sections: {
                    orderBy: { order: 'asc' },
                },
            },
        });
        if (!unscheduled)
            return null;
        await this.assignScheduledDate(unscheduled.id, startOfDay);
        return {
            ...unscheduled,
            scheduledAt: startOfDay,
        };
    }
    async findStoryByDate(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const inputDate = new Date(date);
        inputDate.setHours(0, 0, 0, 0);
        if (inputDate > yesterday) {
            throw new Error('Nur Daten bis einschließlich gestern sind erlaubt.');
            console.log('Nur Daten bis einschließlich gestern sind erlaubt.');
        }
        const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999));
        const existingStory = this.prisma.story.findFirst({
            where: {
                scheduledAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            include: {
                sections: {
                    orderBy: { order: 'asc' },
                },
            },
        });
        return existingStory ?? null;
    }
    async generateAndSaveStory() {
        const storyData = await this.aiService.generateStory();
        console.dir(storyData);
        const story = await this.prisma.story.create({
            data: {
                title: storyData.title,
            },
        });
        await Promise.all(storyData.sections.map((text, index) => this.prisma.section.create({
            data: {
                text,
                order: index,
                storyId: story.id,
            },
        })));
        return this.prisma.story.findUnique({
            where: { id: story.id },
            include: { sections: true },
        });
        ;
    }
};
exports.StoriesService = StoriesService;
exports.StoriesService = StoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ai_service_1.AiService])
], StoriesService);
//# sourceMappingURL=stories.service.js.map