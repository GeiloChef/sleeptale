import type {StoryWithoutSections, StoryWithSections} from "@/types/Story.types";

export const mapStoryApiToDomainWithSections = (story: StoryWithSections): StoryWithSections => {
  return {
    ...story,
    sections: story.sections ? story.sections.sort((a, b) => a.order - b.order) : []
  }
}