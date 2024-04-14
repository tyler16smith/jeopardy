import { getUniqueIconAndColor } from '@/utils/colors-and-icons';
import supabase from '@/utils/supabase';
import { type TPlayer, TQuestion } from '@/utils/types';
import cuid from 'cuid';

export const importJeopardyCSV = async (text: string) => {
  if (!text) throw new Error('No csv data provided.');
  // initialize category stack (unique array of categories)
  let game: any = {};
  const categories: any[] = [];
  const questions: any[] = [];
  const players: TPlayer[] = [];

  // Parse the CSV
  const rows = text.split('\n');
  for (const row of rows) {
    const [
      question,
      answer,
      imageURL_optional,
      pointValue,
      isDailyDouble,
      category,
      divider1,
      player,
      divider2,
      gameName
    ] = row.split(',');
    // skip the first row (header)
    if (question === 'question' && answer === 'answer' && imageURL_optional === 'imageURL_optional')
      continue;
    // game name
    if (gameName && gameName.length > 0 && !game.id)
      game = {
        id: cuid(),
        name: gameName,
      };
    // players
    if (player && player.length > 0) {
      const { iconId, colorId } = getUniqueIconAndColor(players);
      players.push({
        id: cuid(),
        name: player,
        iconId,
        colorId,
        score: 0,
        gameId: game.id,
        originalOrder: players.length,
      });
    }
    // categories
    let newCategoryId = categories.find((c) => c.title === category)?.id;
    if (!newCategoryId) {
      newCategoryId = cuid()
      categories.push({
        id: newCategoryId,
        title: category,
        gameId: game.id,
      });
    }
    // questions
    if (
      question && question.length > 0 &&
      answer && answer.length > 0 &&
      pointValue && pointValue.length > 0
    )
    questions.push({
      id: cuid(),
      text: question,
      answer: answer,
      imageURL: imageURL_optional || null,
      pointValue: parseInt(pointValue),
      isDailyDouble: isDailyDouble?.toLowerCase() === 'true',
      categoryId: newCategoryId,
    });
  }
  // Insert the game
  const { error: gameError } = await supabase
    .from('Game')
    .insert(game);
  if (gameError) throw gameError;

  // Insert the categories
  const { error: categoriesError } = await supabase
    .from('Category')
    .insert(categories);
  if (categoriesError) throw categoriesError;

  // Insert the questions
  const { error: questionsError } = await supabase
    .from('Question')
    .insert(questions);
  if (questionsError) throw questionsError;
  
  // Insert the players
  const { error: playersError } = await supabase
    .from('Player')
    .insert(players);
  if (playersError) throw playersError;

  console.log('CSV import completed successfully.');
  return game.id;
}
