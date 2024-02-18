"use client";

import Image from "next/image";
import { Card } from "~/components/ui/card";
import { type Character } from "../schema/character";
import { useModal } from "@ebay/nice-modal-react";
import { CharacterDetailDialog } from "./character-detail-dialog";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { Heart } from "lucide-react";

export const CharacterCard = ({ character }: { character: Character }) => {
  const modal = useModal(CharacterDetailDialog, { character });

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
        <button
          type="button"
          className=" max-w-40 text-left text-xl font-bold"
          onClick={() => modal.show({ character })}
        >
          {character.name}
        </button>
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
