import { getUniqueIconAndColor } from '@/utils/colors-and-icons';
import { type TPlayer } from '@/utils/types';
import { db } from '../db';
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
        const imageURL = getImageUrl(row.imageURL_optional);
        questions.push({
          id: cuid(),
          text: row.question,
          answer: row.answer,
          imageURL,
          pointValue: parseInt(row.pointValue),
          isDailyDouble: row.isDailyDouble?.toLowerCase() === 'true',
          categoryId: newCategoryId,
        });
      }
    })
  } catch (error) {
    console.error('Error occurred:', error);
  }

  await db.$transaction([
    db.game.create({ data: { id: game.id!, name: game.name! } }),
    db.category.createMany({ data: categories }),
    db.question.createMany({ data: questions }),
    db.player.createMany({
      data: players.map(player => ({
        ...player,
        onTurn: player.originalOrder === 0,
      })),
    }),
  ]);

  console.log('CSV import completed successfully.');
  return game.id!;
}

const getImageUrl = (url: string): string | null => {
  if (!url) return null;
  return url;
}
