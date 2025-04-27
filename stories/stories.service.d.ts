import { PrismaService } from '../prisma/prisma.service';
import { AiService } from "../ai/ai.service";
export declare class StoriesService {
    private prisma;
    private aiService;
    constructor(prisma: PrismaService, aiService: AiService);
    create(title: string, content: string): Promise<{
        id: number;
        title: string;
        createdAt: Date;
        scheduledAt: Date | null;
    }>;
    createTest(): Promise<{
        sections: {
            id: number;
            text: string;
            imageUrl: string | null;
            order: number;
            storyId: number;
        }[];
    } & {
        id: number;
        title: string;
        createdAt: Date;
        scheduledAt: Date | null;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        createdAt: Date;
        scheduledAt: Date | null;
    }[]>;
    assignScheduledDate(storyId: number, date: Date): Promise<{
        id: number;
        title: string;
        createdAt: Date;
        scheduledAt: Date | null;
    }>;
    getStoryForToday(): Promise<{
        sections: {
            id: number;
            text: string;
            imageUrl: string | null;
            order: number;
            storyId: number;
        }[];
    } & {
        id: number;
        title: string;
        createdAt: Date;
        scheduledAt: Date | null;
    }>;
    findStoryByDate(date: Date): Promise<{
        sections: {
            id: number;
            text: string;
            imageUrl: string | null;
            order: number;
            storyId: number;
        }[];
    } & {
        id: number;
        title: string;
        createdAt: Date;
        scheduledAt: Date | null;
    }>;
    generateAndSaveStory(): Promise<{
        sections: {
            id: number;
            text: string;
            imageUrl: string | null;
            order: number;
            storyId: number;
        }[];
    } & {
        id: number;
        title: string;
        createdAt: Date;
        scheduledAt: Date | null;
    }>;
}
