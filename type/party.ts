import { Keyword } from './lunch'
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