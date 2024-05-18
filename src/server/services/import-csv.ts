import { getUniqueIconAndColor } from '@/utils/colors-and-icons';
import supabase from '@/utils/supabase';
import { type TPlayer } from '@/utils/types';
import cuid from 'cuid';
import csv from 'csv-parser';
import fs from 'fs';

type Game = {
  id?: string
  name?: string
}

type Category = {
  id: string
  title: string
  gameId: string
}

type Question = {
  id: string
  text: string
  answer: string
  imageURL: string | null
  pointValue: number
  isDailyDouble: boolean
  categoryId: string
}

type Data = {
  question: string
  answer: string
  imageURL_optional: string
  pointValue: string
  isDailyDouble: string
  category: string
  gameName: string
  player: string
}

export const importJeopardyCSV = async (
  filePath: string
): Promise<string> => {
  if (!filePath) throw new Error('No csv data provided.');
  // initialize category stack (unique array of categories)
  let game: Game = {};
  const categories: Category[] = [];
  const questions: Question[] = [];
  const players: TPlayer[] = [];
  const results: Data[] = [];
  
  async function processData() {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: Data) => results.push(data))
        .on('end', () => {
          resolve(results);
        })
        .on('error', reject);
    });
  }

  try {
    const processedData = await processData();
    if (!Array.isArray(processedData)) {
      throw new Error('No data found in CSV');
    }
    processedData.forEach((row: Data) => {
      if (row.question === 'question' && row.answer === 'answer' && row.imageURL_optional === 'imageURL_optional')
        return;
      // game name
      if (row.gameName && row.gameName.length > 0 && !game.id)
        game = {
          id: cuid(),
          name: row.gameName,
        };
      // players
      if (row.player && row.player.length > 0) {
        const { iconId, colorId } = getUniqueIconAndColor(players);
        players.push({
          id: cuid(),
          name: row.player,
          iconId,
          colorId,
          score: 0,
          gameId: game.id!,
          originalOrder: players.length,
        });
      }
      // categories
      let newCategoryId = categories.find((c) => c.title === row.category)?.id;
      if (!newCategoryId) {
        newCategoryId = cuid()
        categories.push({
          id: newCategoryId,
          title: row.category,
          gameId: game.id!,
        });
      }
      // questions
      if (
        row.question && row.question.length > 0 &&
        row.answer && row.answer.length > 0 &&
        row.pointValue && row.pointValue.length > 0
      ) {
        const supabaseImageUrl = getSupabaseImageUrl(row.imageURL_optional);
        questions.push({
          id: cuid(),
          text: row.question,
          answer: row.answer,
          imageURL: supabaseImageUrl,
          pointValue: parseInt(row.pointValue),
          isDailyDouble: row.isDailyDouble?.toLowerCase() === 'true',
          categoryId: newCategoryId,
        });
      }
    })
  } catch (error) {
    console.error('Error occurred:', error);
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
  return game.id!;
}

const getSupabaseImageUrl = (url: string): string | null => {
  if (!url) return null;
  return url
  // fetch image from url and upload to supabase
  // const image = fs.readFileSync(
  //   url,
  //   'base64'
  // );

  // upload to supabase storage
  // const { data, error } = supabase.storage
  //   .from('jeopardy')
  //   .upload(`public/${url}`, image);
  // if (error) throw error;
  // return data?.Key || '';
}
