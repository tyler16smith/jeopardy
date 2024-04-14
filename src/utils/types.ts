export type TPlayer = {
  id: string
  name: string
  iconId: number
  colorId: number
  score: number
  originalOrder: number
  gameId: string
}

export type TQuestion = {
  id: string
  text: string
  answer: string
  pointValue: number
  answeredBy: string | null
  imageURL: string | null
  isDailyDouble: boolean
  category: {
    id: string
    title: string
    gameId: string
  }
}

export type TGroupQuestions = {
  pointValue: number
  questions: TQuestion[]
}

export type TCategory = {
  id: string
  title: string
  gameId: string
  questions: TQuestion[]
}