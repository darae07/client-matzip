export type Keyword = {
  id: number
  name: string
  hit_count: number
  eat_count: number
  team: number
  category?: Category
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
