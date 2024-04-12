import supabase from "@/utils/supabase"
import { TPlayer } from "@/utils/types"

export const getGame = async (gameId: string) => {
  // get game
  const {
    data: game,
    error: gameError
  } = await supabase
    .from('Game')
    .select('*')
    .eq('id', gameId)
    .single()
  
  // get categories
  const {
    data: categories,
    error: categoriesError
  } = await supabase
    .from('Category')
    .select('*')
    .eq('gameId', gameId)

  // get questions
  const {
    data: questions,
    error: questionsError
  } = await supabase
    .from('Question')
    .select(`
      id,
      text,
      answer,
      pointValue,
      answeredBy,
      category:Category(id, title, gameId)
    `)
    .eq('category.gameId', gameId)
    .order('pointValue', { ascending: true })

  if (gameError || categoriesError || questionsError) {
    console.error(
      'Error fetching game data:',
      gameError || categoriesError || questionsError
    )
    return
  }

  // get players
  const {
    data: players,
    error: playersError
  } = await supabase
    .from('Player')
    .select('*')
    .eq('gameId', gameId)

  // Group questions by pointValue
  const groupedByPointValue = questions.reduce((acc, question) => {
    const { pointValue } = question
    if (!acc[pointValue]) {
      acc[pointValue] = {
        pointValue,
        questions: []
      }
    }
    acc[pointValue].questions.push(question)
    return acc
  }, {})

  // Sort questions within each pointValue group by the category order
  Object.values(groupedByPointValue).forEach(group => {
    group.questions.sort((a, b) => {
      const indexA = categories.findIndex(cat => cat.id === a.category.id)
      const indexB = categories.findIndex(cat => cat.id === b.category.id)
      return indexA - indexB
    })
  })

  // Convert the grouped object into an array sorted by pointValue
  const sortedGroups = Object.keys(groupedByPointValue)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(pointValue => groupedByPointValue[pointValue])

  // sort players by score
  players?.sort((a, b) => b.score - a.score)

  return {
    game,
    players,
    categories,
    questions: sortedGroups
  }
}

export const saveGameDetails = async (
  gameId: string,
  name: string,
  players: TPlayer[]
) => {
  debugger;
  const { error: gameError } = await supabase
    .from('Game')
    .upsert({
      id: gameId,
      name,
    })
  
  const { error: playerError } = await supabase
    .from('Player')
    .upsert(
      players.map(player => ({
        ...player,
        gameId
      }))
    )

  if (gameError || playerError) {
    console.error('Error saving game details:', gameError || playerError)
    return false
  }

  return true
}

export const savePoints = async (
  player: TPlayer,
  gameId: string,
  questionId: string
) => {
  const { error } = await supabase
    .from('Player')
    .upsert({
      ...player,
      gameId
    })
  const { error: questionError } = await supabase
    .from('Question')
    .update({
      answeredBy: player.id
    })
    .eq('id', questionId)

  if (error || questionError) {
    console.error('Error saving points:', error)
    return false
  }

  return true
}
