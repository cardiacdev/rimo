import { and, eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { favoriteEpisodes } from "~/server/db/schema";

export const episodeRouter = createTRPCRouter({
  getFavoriteEpisodes: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.favoriteEpisodes.findMany({
        where: (favoriteEpisodes, { eq }) =>
          eq(favoriteEpisodes.userId, input.userId),
        columns: {
          episodeId: true,
        },
      });
    }),

  addFavoriteEpisode: protectedProcedure
    .input(z.object({ userId: z.string(), episodeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(favoriteEpisodes).values({
        userId: input.userId,
        episodeId: input.episodeId,
      });
    }),

  removeFavoriteEpisode: protectedProcedure
    .input(z.object({ userId: z.string(), episodeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(favoriteEpisodes)
        .where(
          and(
            eq(favoriteEpisodes.userId, input.userId),
            eq(favoriteEpisodes.episodeId, input.episodeId),
          ),
        );
    }),
});
