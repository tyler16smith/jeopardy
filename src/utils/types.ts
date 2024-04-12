export type TPlayer = {
  id: string
  name: string
  iconId: number
  colorId: number
  score: number
}

export type TQuestion = {
  id: string
  text: string
  answer: string
  pointValue: number
  answeredBy: string | null
  category: {
    id: string
    title: string
    gameId: string
  }
}