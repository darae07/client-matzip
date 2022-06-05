import { Keyword } from './lunch'
import { Review } from './review'
import { TeamMember } from './user'

export type Party = {
  id: number
  membership: Array<PartyMembership>
  keyword: Keyword
  name: string
  description?: string
  created_at: string
  closed_at?: string
  eat: boolean
  team: number
  reviews: Review[]
}

export type PartyMembership = {
  id: number
  team_member: TeamMember
  invite_member?: TeamMember
  created_at: string
  date_joined: string
  invite_reason: string
  status: number
  party: number
}

export type CreatePartyValue = {
  name: string
  keyword: string
  category: number
  description?: string
}

export type joinPartyValue = {
  party: number
  invite_reason?: string
}

export type ReviewCreateValue = {
  content: string
  image: []
}
