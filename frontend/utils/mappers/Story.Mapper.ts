import type {Section, StoryDto} from "@/types/Story.types";

export const mapStoryApiToDomain = (story: StoryDto): StoryDto => {
  return {
    ...story,
    sections: story.sections.sort((a, b) => a.order - b.order)
  }
}