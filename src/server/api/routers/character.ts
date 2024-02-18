import { and, eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { favoriteCharacters } from "~/server/db/schema";

export const characterRouter = createTRPCRouter({
  getFavoriteCharacters: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.favoriteCharacters.findMany({
        where: (favoriteCharacters, { eq }) =>
          eq(favoriteCharacters.userId, input.userId),
        columns: {
          characterId: true,
        },
      });
    }),

  addFavoriteCharacter: protectedProcedure
    .input(z.object({ userId: z.string(), characterId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(favoriteCharacters).values({
        userId: input.userId,
        characterId: input.characterId,
      });
    }),

  removeFavoriteCharacter: protectedProcedure
    .input(z.object({ userId: z.string(), characterId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(favoriteCharacters)
        .where(
          and(
            eq(favoriteCharacters.userId, input.userId),
            eq(favoriteCharacters.characterId, input.characterId),
          ),
        );
    }),
});
