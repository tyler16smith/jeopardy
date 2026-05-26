import { type TGroupQuestions, TQuestion, type TPlayer } from "@/utils/types"
import { db } from "../db"
import { nobodyPlayer } from "@/utils/players"

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

  // group questions by their category, sorting them by pointValue
  const initCategories = game.categories.map(category => ({
    ...category,
    questions: category.questions.sort((a, b) => a.pointValue - b.pointValue)
  }));
  const categories = initCategories.map(category => ({
    ...category,
    questions: category.questions.map(question => ({
      ...question,
      category: {
        id: category.id,
        title: category.title,
        gameId: category.gameId
      },
    }))
  }));

  // Sort players by score
  const players = game.players.sort((a, b) => b.score - a.score);

  return {
    game,
    players,
    categories,
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
  
  // delete all players and reinsert them
  await db.player.deleteMany({
    where: { gameId }
  });
  await db.player.createMany({
    data: players.map(player => ({
      ...player,
      gameId,
      onTurn: player.originalOrder === 0,
    }))
  });

  return true
}

export const savePoints = async (
  player: TPlayer,
  gameId: string,
  questionId: string
) => {
  try {
    if (player.id !== nobodyPlayer.id) {
      await db.player.upsert({
        where: { id: player.id },
        update: { ...player, gameId },
        create: { ...player, gameId },
      });
    }
    await db.question.update({
      where: { id: questionId },
      data: { answeredBy: player.id },
    });
    return true;
  } catch (error) {
    console.error('Error saving points:', error);
    return false;
  }
}

export const savePlayerTurn = async (gameId: string, playerId: string) => {
  await db.$transaction([
    db.player.updateMany({
      where: { gameId },
      data: { onTurn: false },
    }),
    db.player.update({
      where: { id: playerId },
      data: { onTurn: true },
    }),
  ]);
}
