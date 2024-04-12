import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { importJeopardyCSV } from "@/server/services/import-csv";
import { getGame, saveGameDetails, savePoints } from "@/server/services/game";

export const gameRouter = createTRPCRouter({
  importCSV: publicProcedure
    .input(z.object({
      text: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await importJeopardyCSV(input.text);
    }),
  getGame: publicProcedure
    .input(z.object({
      gameId: z.string().nullable(),
    }))
    .query(async ({ input }) => {
      if (!input.gameId) return null
      return await getGame(input.gameId);
    }),
  saveGameDetails: publicProcedure
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
        })
      ),
    }))
    .mutation(async ({ input }) => {
      return await saveGameDetails(
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
});
