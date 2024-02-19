import { and, eq } from "drizzle-orm";
import { env } from "process";
import { z } from "zod";
import {
  episodeArraySchema,
  episodeCollectionSchema,
  episodeSchema,
} from "~/app/schema/episode";

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
    .input(z.object({ page: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/episode?page=${input.page}`,
      );
      if (!response.ok) throw new Error("Failed to fetch episodes");
      const json = await response.json();
      const data = episodeCollectionSchema.parse(json);
      return data;
    }),

  fetchSingleEpisode: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/episode/${input.id}`,
      );
      if (!response.ok) throw new Error("Failed to fetch episode");
      const json = await response.json();
      const data = episodeSchema.parse(json);
      return data;
    }),

  fetchMultipleEpisodes: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(async ({ input }) => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/episode/${input.ids.join(",")}`,
      );
      if (!response.ok) throw new Error("Failed to fetch episodes");
      const json = await response.json();
      const data = episodeArraySchema.parse(json);
      return data;
    }),
});
