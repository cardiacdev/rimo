"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

interface CharacterHeartProps {
  characterId: number;
  className?: string;
}

export const CharacterHeart = ({
  characterId,
  className,
}: CharacterHeartProps) => {
  const { data } = useSession();
  const { data: favorites } = api.character.getFavoriteCharacters.useQuery();

  const utils = api.useUtils();

  const favoritize = api.character.addFavoriteCharacter.useMutation({
    onSuccess: async () => {
      await utils.character.getFavoriteCharacters.invalidate();
    },
  });

  const unfavoritize = api.character.removeFavoriteCharacter.useMutation({
    onSuccess: async () => {
      await utils.character.getFavoriteCharacters.invalidate();
    },
  });

  const isFavorite = favorites?.some(
    (fav) => fav.characterId === String(characterId),
  );
  return (
    <>
      {data?.user.id && isFavorite && (
        <Heart
          className={cn(
            "mt-auto h-6 w-6 cursor-pointer self-end fill-red-500 text-red-500",
            className,
          )}
          onClick={() => {
            data?.user.id &&
              unfavoritize.mutate({
                characterId: String(characterId),
              });
          }}
        />
      )}
      {data?.user.id && !isFavorite && (
        <Heart
          className={cn("mt-auto h-6 w-6 cursor-pointer self-end", className)}
          onClick={() =>
            data?.user.id &&
            favoritize.mutate({
              characterId: String(characterId),
            })
          }
        />
      )}
    </>
  );
};
