import supabase from "@/utils/supabase"

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

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError)
    return
  }

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
      category:Category(id, title, gameId)
    `)
    .eq('category.gameId', gameId)
    .order('pointValue', { ascending: true })

  if (questionsError) {
    console.error('Error fetching questions:', error)
    return
  }

  // get players
  const {
    data: players,
    error: playersError
  } = await supabase
    .from('Player')
    .select('name')
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

  return {
    game,
    players,
    categories,
    questions: sortedGroups
  }
}

export const saveGameDetails = async (gameId: string, name: string, players: string[]) => {
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
      players.map(name => ({
        gameId,
        name
      }))
    )

  if (gameError || playerError) {
    console.error('Error saving game details:', gameError || playerError)
    return false
  }

  return true
}
