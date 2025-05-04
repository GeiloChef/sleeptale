export interface Section {
  id: number
  text: string
  imageUrl?: string | null
  order: number
  storyId: number
}

export interface StoryDto {
  id: number
  title: string
  description: string
  createdAt: string
  scheduledAt?: string | null
  sections: Section[]
}