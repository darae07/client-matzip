const LOGIN_CHOICES = {
  kakao: 'kakao',
  email: 'email',
  google: 'google',
} as const
type LOGIN_CHOICES = typeof LOGIN_CHOICES[keyof typeof LOGIN_CHOICES]

export interface User {
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
  login_method: LOGIN_CHOICES | null
  team_profile: TeamMember | null
}

export type TeamMember = {
  date_joined: string
  id: number
  image: string
  is_selected: Boolean
  member_name: string | null
  team: number
  title: string | null
  user: number
}

export type TeamMemberDetail = {
  user: User
} & Omit<TeamMember, 'user'>
