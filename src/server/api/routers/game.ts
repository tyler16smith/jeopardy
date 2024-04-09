import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { importJeopardyCSV } from "@/server/services/import-csv";

export const gameRouter = createTRPCRouter({
  importCSV: publicProcedure
    .input(z.object({
      text: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await importJeopardyCSV(input.text);
    }),
});
