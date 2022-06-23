import { ReviewScore } from './review'
import { TeamMember } from './user'

export type Keyword = {
  id: number
  name: string
  hit_count: number
  eat_count: number
  good_count: number
  team: number
  category?: Category
  score: ReviewScore
}

export type Category = {
  id: number
  name: string
}

export type Marker = {
  position: {
    lat: number
    lng: number
  }
  id?: number | string
  content: string
  place_url: string
}

export type Vote = {
  team_member: TeamMember
  lunch: number
  created_at: string
}

export type Lunch = {
  id: number
  title: string
  eat: boolean
  crew: number
  keyword: Keyword
  created_at: string
  votes: Vote[]
}
