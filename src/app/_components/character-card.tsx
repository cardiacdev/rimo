"use client";

import Image from "next/image";
import { Card } from "~/components/ui/card";
import { type Character } from "../schema/character";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { Heart } from "lucide-react";
import Link from "next/link";

export const CharacterCard = ({ character }: { character: Character }) => {
  const { data } = useSession();
  const { data: favorites } = api.character.getFavoriteCharacters.useQuery({
    userId: data?.user.id ?? "",
  });

  const utils = api.useUtils();

  const favoritize = api.character.addFavoriteCharacter.useMutation({
    onSuccess: async () => {
      // TODO - invalidate based on query keys
      await utils.invalidate();
    },
  });

  const unfavoritize = api.character.removeFavoriteCharacter.useMutation({
    onSuccess: async () => {
      // TODO - invalidate based on query keys
      await utils.invalidate();
    },
  });

  const isFavorite = favorites?.some(
    (fav) => fav.characterId === String(character.id),
  );

  return (
    <Card key={character.id} className="mt-4 flex items-center gap-4 p-4">
      <div>
        <Link
          href={`/character/${character.id}`}
          className=" max-w-40 text-left text-xl font-bold"
        >
          {character.name}
        </Link>
        <p>{character.species}</p>
      </div>
      <Image
        src={character.image}
        alt={character.name}
        width={75}
        height={75}
        className="rounded-full"
      />
      {isFavorite && (
        <Heart
          className="mt-auto h-6 w-6 cursor-pointer self-end fill-red-500 text-red-500"
          onClick={() => {
            data?.user.id &&
              unfavoritize.mutate({
                userId: data.user.id,
                characterId: String(character.id),
              });
          }}
        />
      )}
      {!isFavorite && (
        <Heart
          className="mt-auto h-6 w-6 cursor-pointer self-end"
          onClick={() =>
            data?.user.id &&
            favoritize.mutate({
              userId: data.user.id,
              characterId: String(character.id),
            })
          }
        />
      )}
    </Card>
  );
};
