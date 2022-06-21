import { TeamMember } from './user'

export type Crew = {
  id: number
  name: string
  image?: string
  title?: string
  team_id: number
  created_at: string
  membership: Array<CrewMembership>
}

export type CreateCrewValue = {
  name: string
  image?: File | string
  title?: string
}

export type CrewMembership = {
  id: number
  team_member: TeamMember
  invite_member?: TeamMember
  created_at: string
  date_joined: string
  invite_reason: string
  status: number
  crew: number
}
