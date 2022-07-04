import { ReviewImage, ReviewScore } from './review'
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
  use_team_location: boolean
  use_kakaomap: boolean
}

export type SearchKeywordValue = {
  keyword: string
  use_team_location: boolean
  use_kakaomap: boolean
  isSetted: boolean
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
  road_address_name: string
  phone: string
}

export type Vote = {
  id: number
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

export type LunchList = {
  image?: ReviewImage
} & Lunch

export type CreateLunchValue = {
  title: string
  keyword: string
  category: number
  crew: number
}
