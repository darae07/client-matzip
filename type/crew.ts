export type Crew = {
  id: number
  name: string
  image?: string
  title?: string
  team_id: number
}

export type CreateCrewValue = {
  name: string
  image?: File
  title?: string
}
