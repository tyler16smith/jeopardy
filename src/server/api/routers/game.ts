import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { importJeopardyCSV } from "@/server/services/import-csv";
import { getGame, saveSetupDetails, savePoints, savePlayerTurn } from "@/server/services/game";

export const gameRouter = createTRPCRouter({
  importCSV: publicProcedure
    .input(z.object({
      text: z.string(),
    }))
    .mutation(async ({ input }): Promise<string> => {
      return await importJeopardyCSV(input.text);
    }),
  
  getGame: publicProcedure
    .input(z.object({
      gameId: z.string(),
    }))
    .query(async ({ input }) => {
      return await getGame(input.gameId);
    }),

  getSetupDetails: publicProcedure
    .input(z.object({
      gameId: z.string(),
    }))
    .query(async ({ input }) => {
      return await getGame(input.gameId);
    }),
  
  saveSetupDetails: publicProcedure
    .input(z.object({
      gameId: z.string(),
      name: z.string(),
      players: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          iconId: z.number(),
          colorId: z.number(),
          score: z.number(),
          originalOrder: z.number(),
          gameId: z.string(),
        })
      ),
    }))
    .mutation(async ({ input }) => {
      return await saveSetupDetails(
        input.gameId,
        input.name,
        input.players
      );
    }),
  
  updatePoints: publicProcedure
    .input(z.object({
      player: z.object({
        id: z.string(),
        name: z.string(),
        iconId: z.number(),
        colorId: z.number(),
        score: z.number(),
        gameId: z.string(),
        originalOrder: z.number(),
      }),
      gameId: z.string(),
      questionId: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await savePoints(
        input.player,
        input.gameId,
        input.questionId,
      );
    }),

  savePlayerTurn: publicProcedure
    .input(z.object({
      playerId: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await savePlayerTurn(input.playerId);
    })
});
