import { and, eq } from "drizzle-orm";
import { z } from "zod";
import {
  characterArraySchema,
  characterCollectionSchema,
  characterSchema,
} from "~/app/schema/character";
import { env } from "~/env";

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
    .input(z.object({ page: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/character?page=${input.page}`,
      );
      if (!response.ok) throw new Error("Failed to fetch characters");
      const json = await response.json();
      const data = characterCollectionSchema.parse(json);
      return data;
    }),

  fetchSingleCharacter: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/character/${input.id}`,
      );
      if (!response.ok) throw new Error("Failed to fetch character");
      const json = await response.json();
      const data = characterSchema.parse(json);
      return data;
    }),

  fetchMultipleCharacters: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(async ({ input }) => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/character/${input.ids.join(",")}`,
      );
      if (!response.ok) throw new Error("Failed to fetch characters");
      const json = await response.json();
      const data = characterArraySchema.parse(json);
      return data;
    }),
});
