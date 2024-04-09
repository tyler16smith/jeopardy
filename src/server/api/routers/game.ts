import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { importJeopardyCSV } from "@/server/services/import-csv";
import { getGame } from "@/server/services/get-game";

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
});
