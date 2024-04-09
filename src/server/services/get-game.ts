import supabase from "@/utils/supabase"

export const getGame = async (gameId: string) => {
  // debugger
  const { data, error } = await supabase.from('Game').select('*')
  if (data) {
    console.log('Game data:', data)
    // return
  }
  if (error) {
    console.error('Error fetching game:', error)
    return
  }
  
  // get categories
  const {
    data: categories,
    error: categoriesError
  } = await supabase
    .from('Category')
    .select('*')
    .eq('gameId', gameId)
    // .order('id', { ascending: true })

  if (categoriesError) {
    console.error('Error fetching categories:', error)
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

  // Group questions by pointValue
  const groupedByPointValue = data.reduce((acc, question) => {
    const { pointValue } = question
    if (!acc[pointValue]) {
      acc[pointValue] = []
    }
    acc[pointValue].push(question)
    return acc
  }, {})

  // Convert the grouped object into an array of arrays sorted by pointValue
  const sortedGroups = Object.keys(groupedByPointValue)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(pointValue => groupedByPointValue[pointValue])

  // group questions by category
  const groupedByCategory = groupedByPointValue.reduce((acc, question) => {
    const { category } = question
    if (!acc[category.id]) {
      acc[category.id] = {
        id: category.id,
        title: category.title,
        questions: []
      }
    }
    acc[category.id].questions.push(question)
    return acc
  }, {})

  return sortedGroups
}
