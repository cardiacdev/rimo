"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

interface EpisodeHeartProps {
  episodeId: number;
  className?: string;
}

export const EpisodeHeart = ({ episodeId, className }: EpisodeHeartProps) => {
  const { data } = useSession();
  const { data: favorites } = api.episode.getFavoriteEpisodes.useQuery();

  const utils = api.useUtils();

  const favoritize = api.episode.addFavoriteEpisode.useMutation({
    onSuccess: async () => {
      await utils.episode.getFavoriteEpisodes.invalidate();
    },
  });

  const unfavoritize = api.episode.removeFavoriteEpisode.useMutation({
    onSuccess: async () => {
      await utils.episode.getFavoriteEpisodes.invalidate();
    },
  });

  const isFavorite = favorites?.some(
    (fav) => fav.episodeId === String(episodeId),
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
                episodeId: String(episodeId),
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
              episodeId: String(episodeId),
            })
          }
        />
      )}
    </>
  );
};
