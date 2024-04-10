import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { importJeopardyCSV } from "@/server/services/import-csv";
import { getGame, saveGameDetails } from "@/server/services/game";

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
      players: z.array(z.string()),
    }))
    .mutation(async ({ input }) => {
      return await saveGameDetails(input.gameId, input.name, input.players);
    }),
});
