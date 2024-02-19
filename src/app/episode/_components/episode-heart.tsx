"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

export const EpisodeHeart = ({ episodeId }: { episodeId: number }) => {
  const { data } = useSession();
  const { data: favorites } = api.episode.getFavoriteEpisodes.useQuery();

  const utils = api.useUtils();

  const favoritize = api.episode.addFavoriteEpisode.useMutation({
    onSuccess: async () => {
      // TODO - invalidate based on query keys
      await utils.invalidate();
    },
  });

  const unfavoritize = api.episode.removeFavoriteEpisode.useMutation({
    onSuccess: async () => {
      // TODO - invalidate based on query keys
      await utils.invalidate();
    },
  });

  const isFavorite = favorites?.some(
    (fav) => fav.episodeId === String(episodeId),
  );
  return (
    <>
      {data?.user.id && isFavorite && (
        <Heart
          className="mt-auto h-6 w-6 cursor-pointer self-end fill-red-500 text-red-500"
          onClick={() => {
            data?.user.id &&
              unfavoritize.mutate({
                episodeId: String(episodeId),
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
              episodeId: String(episodeId),
            })
          }
        />
      )}
    </>
  );
};
