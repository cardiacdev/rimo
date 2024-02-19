import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

export const CharacterHeart = ({ characterId }: { characterId: number }) => {
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
    (fav) => fav.characterId === String(characterId),
  );
  return (
    <>
      {data?.user.id && isFavorite && (
        <Heart
          className="mt-auto h-6 w-6 cursor-pointer self-end fill-red-500 text-red-500"
          onClick={() => {
            data?.user.id &&
              unfavoritize.mutate({
                userId: data.user.id,
                characterId: String(characterId),
              });
          }}
        />
      )}
      {data?.user.id && !isFavorite && (
        <Heart
          className="mt-auto h-6 w-6 cursor-pointer self-end"
          onClick={() =>
            data?.user.id &&
            favoritize.mutate({
              userId: data.user.id,
              characterId: String(characterId),
            })
          }
        />
      )}
    </>
  );
};
