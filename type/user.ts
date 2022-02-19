export interface User {
  user: {
    id: number
    date_joined: string
    email: string
    image: string
    is_staff: Boolean
    is_superuser: Boolean
    last_login: string
    nickname: string | null
    phone_number: string | null
    status: string | null
    team_profile: TeamMember | null
  } | null
}

export interface TeamMember {
  date_joined: string
  id: number
  image: string
  is_selected: Boolean
  member_name: string | null
  team: number
  title: string | null
  user: number
}
