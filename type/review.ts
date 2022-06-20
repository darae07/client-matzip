import { TeamMember } from './user'

export type Review = {
  content: string
  id: number
  images?: ReviewImage[]
  keword: number
  created_at: string
  modified_at: string
  team_member: TeamMember
  score: ReviewScore
}

export type ReviewImage = {
  id: number
  image: string
  review: number
}

export enum ReviewScore {
  BAD = 1,
  SOSO = 3,
  GOOD = 5,
}
