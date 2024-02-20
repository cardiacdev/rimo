import { and, eq } from "drizzle-orm";
import { getEpisode, getEpisodes } from "rickmortyapi";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { favoriteEpisodes } from "~/server/db/schema";

export const episodeRouter = createTRPCRouter({
  getFavoriteEpisodes: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.favoriteEpisodes.findMany({
      where: (favoriteEpisodes, { eq }) =>
        eq(favoriteEpisodes.userId, ctx.session.user.id),
      columns: {
        episodeId: true,
      },
    });
  }),

  addFavoriteEpisode: protectedProcedure
    .input(z.object({ episodeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(favoriteEpisodes).values({
        userId: ctx.session.user.id,
        episodeId: input.episodeId,
      });
    }),

  removeFavoriteEpisode: protectedProcedure
    .input(z.object({ episodeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(favoriteEpisodes)
        .where(
          and(
            eq(favoriteEpisodes.userId, ctx.session.user.id),
            eq(favoriteEpisodes.episodeId, input.episodeId),
          ),
        );
    }),

  fetchAllEpisodes: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ input }) => {
      const data = await getEpisodes({ page: input.page });
      if (data.status !== 200) throw new Error("Failed to fetch episodes");
      return data.data;
    }),

  fetchSingleEpisode: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const data = await getEpisode(input.id);
      if (data.status !== 200) throw new Error("Failed to fetch episode");
      return data.data;
    }),

  fetchMultipleEpisodes: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(async ({ input }) => {
      const data = await getEpisode(input.ids);
      if (data.status !== 200) throw new Error("Failed to fetch episodes");
      return data.data;
    }),
});
