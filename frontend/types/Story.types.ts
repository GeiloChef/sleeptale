export interface Section {
  id: number
  text: string
  imageUrl?: string | null
  order: number
  storyId: number
}

export interface StoryWithSections {
  id: number
  title: string
  description: string
  imageUrl?: string | null
  createdAt: string
  scheduledAt?: string | null
  sections: Section[]
}

export type StoryWithoutSections = Omit<StoryWithSections, 'sections'>;
