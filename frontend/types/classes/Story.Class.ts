import type {Section, StoryWithSections} from "@/types/Story.types";
import {AgeGroupTypes} from "@/types/Story.types";
import {MomentFormat} from "@/types/Core.Types";

export class Story implements StoryWithSections {
  ageGroup: AgeGroupTypes;
  createdAt: string;
  description: string;
  id: number;
  imageUrl: string | null;
  scheduledAt: string | null;
  sections: Section[];
  title: string;

  constructor() {
    this.ageGroup = AgeGroupTypes.Kids;
    this.createdAt = '';
    this.description = 'This is a sample story';
    this.id = 0;
    this.imageUrl = null;
    this.scheduledAt = null;
    this.sections = [];
    this.title = 'New Story 1';
  }

  public setValueFromStoryWithSections(storyWithSections: StoryWithSections): void {
    this.ageGroup = storyWithSections.ageGroup;
    this.createdAt = storyWithSections.createdAt;
    this.description = storyWithSections.description;
    this.id = storyWithSections.id;
    this.imageUrl = storyWithSections.imageUrl ?? null;
    this.scheduledAt = storyWithSections.scheduledAt ?? null;
    this.title = storyWithSections.title;

    if (storyWithSections.sections) {
      this.sections = storyWithSections.sections.sort((a, b) => a.order - b.order);
    }
  }

  get formattedDateForRoute(): string {
    return moment(this.scheduledAt).format(MomentFormat.DateUrl)
  }

  public openStoryPage(): void {
    navigateToStoryPage({
      date: this.formattedDateForRoute,
      id: this.id,
      ageGroup: this.ageGroup
    });
  }
}