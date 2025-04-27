import { StoriesService } from './stories.service';
export declare class StoriesController {
    private readonly storiesService;
    constructor(storiesService: StoriesService);
    create(title: string, content: string): Promise<{
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
    getToday(): Promise<{
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
    generateStory(): void;
    getByDate(dateStr: string): Promise<{
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
