export declare class AiService {
    private openai;
    constructor();
    generateStory(): Promise<{
        title: string;
        sections: string[];
    }>;
}
