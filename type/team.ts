export interface CreateTeamValue {
  name: string
  location: string
}

export interface FindTeamValue {
  code: string
}

export interface Team {
  created_at: string
  id: number
  image: null | string
  join_code: string
  location: string
  name: string
  title: string | null
}

export interface CreateMembershipValue {
  team: number
  member_name: string
}
