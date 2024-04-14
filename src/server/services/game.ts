import supabase from "@/utils/supabase"
import { TGroupQuestions, TQuestion, type TPlayer } from "@/utils/types"
import { db } from "../db"

type TGroupByPointValue = Record<string, TGroupQuestions>

export const getGame = async (gameId: string) => {
  const game = await db.game.findUnique({
    where: {
      id: gameId
    },
    include: {
      players: true,
      categories: {
        include: {
          questions: {
            orderBy: {
              pointValue: 'asc'
            }
          }
        }
      },
    }
  });

  if (!game)
    throw new Error('Game not found');

  const { players, categories } = game;

  // Group questions by pointValue across all categories
  const groupedByPointValue: TGroupByPointValue = {};
  categories.forEach(category => {
    category.questions.forEach(question => {
      const { pointValue } = question;
      if (!groupedByPointValue[pointValue]) {
        groupedByPointValue[pointValue] = {
          pointValue,
          questions: []
        };
      }
      groupedByPointValue[pointValue]?.questions.push({ ...question, category });
    });
  });

  // Sort questions within each pointValue group by the category order
  Object.values(groupedByPointValue).forEach((group: TGroupQuestions) => {
    group.questions.sort((a: TQuestion, b: TQuestion) => {
      const indexA = categories.findIndex(cat => cat.id === a.category.id);
      const indexB = categories.findIndex(cat => cat.id === b.category.id);
      return indexA - indexB;
    });
  });

  // Convert the grouped object into an array sorted by pointValue
  const sortedGroups = Object.keys(groupedByPointValue)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(pointValue => groupedByPointValue[pointValue]);

  // Sort players by score
  players.sort((a, b) => b.score - a.score);

  return {
    game,
    players,
    categories,
    questions: sortedGroups
  };
}

export const getSetupDetails = async (gameId: string) => {
  const game = await db.game.findUnique({
    where: { id: gameId },
    include: { players: true }
  });

  if (!game)
    throw new Error('Game not found');

  return game;
}

export const saveSetupDetails = async (
  gameId: string,
  name: string,
  players: TPlayer[]
) => {
  await db.game.upsert({
    where: { id: gameId },
    update: { name },
    create: {
      id: gameId,
      name
    }
  });
  
  const { error: playerError } = await supabase
    .from('Player')
    .upsert(
      players.map(player => ({
        ...player,
        gameId
      }))
    )

  if (playerError) {
    console.error('Error saving game details:', playerError)
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

  if (error ?? questionError) {
    console.error('Error saving points:', error)
    return false
  }

  return true
}

export const savePlayerTurn = async (playerId: string) => {
  await db.player.update({
    where: { id: playerId },
    data: { onTurn: true }
  });
}
