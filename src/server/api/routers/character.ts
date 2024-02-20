import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getCharacter, getCharacters } from "rickmortyapi";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { favoriteCharacters } from "~/server/db/schema";

export const characterRouter = createTRPCRouter({
  getFavoriteCharacters: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.favoriteCharacters.findMany({
      where: (favoriteCharacters, { eq }) =>
        eq(favoriteCharacters.userId, ctx.session.user.id),
      columns: {
        characterId: true,
      },
    });
  }),

  addFavoriteCharacter: protectedProcedure
    .input(z.object({ characterId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(favoriteCharacters).values({
        userId: ctx.session.user.id,
        characterId: input.characterId,
      });
    }),

  removeFavoriteCharacter: protectedProcedure
    .input(z.object({ characterId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(favoriteCharacters)
        .where(
          and(
            eq(favoriteCharacters.userId, ctx.session.user.id),
            eq(favoriteCharacters.characterId, input.characterId),
          ),
        );
    }),

  fetchAllCharacters: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ input }) => {
      const data = await getCharacters({ page: input.page });
      if (data.status !== 200) throw new Error("Failed to fetch characters");
      return data.data;
    }),

  fetchSingleCharacter: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const data = await getCharacter(input.id);
      if (data.status !== 200) throw new Error("Failed to fetch character");
      return data.data;
    }),

  fetchMultipleCharacters: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(async ({ input }) => {
      const data = await getCharacter(input.ids);
      if (data.status !== 200) throw new Error("Failed to fetch characters");
      return data.data;
    }),
});
