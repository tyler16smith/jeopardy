export type TPlayer = {
  id: string
  name: string
  iconId: number
  colorId: number
}

export type TQuestion = {
  id: string
  text: string
  answer: string
  pointValue: number
  category: {
    id: string
    title: string
    gameId: string
  }
}