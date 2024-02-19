"use server";

import { api } from "~/trpc/server";

export const favoriteCharacter = async (
  userId: string,
  characterId: string,
) => {
  await api.character.addFavoriteCharacter.mutate({
    userId,
    characterId,
  });
};

export const unfavoriteCharacter = async (
  userId: string,
  characterId: string,
) => {
  await api.character.removeFavoriteCharacter.mutate({
    userId,
    characterId,
  });
};
