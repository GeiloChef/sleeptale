import type {StoryDto} from "@/types/Story.types";

export const createDefaultStory = (): StoryDto => {
  return {
    createdAt: "",
    sections: [],
    title: "",
    scheduledAt: null,
    id: 0
  }
}