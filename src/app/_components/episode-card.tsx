"use client";

import { Card } from "~/components/ui/card";
import { type Episode } from "../schema/episode";
import { useModal } from "@ebay/nice-modal-react";
import { EpisodeDetailDialog } from "./episode-detail-dialog";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";

export const EpisodeCard = ({ episode }: { episode: Episode }) => {
  const modal = useModal(EpisodeDetailDialog, { episode });
  const { data } = useSession();
  const { data: favorites } = api.episode.getFavoriteEpisodes.useQuery({
    userId: data?.user.id ?? "",
  });

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
    (fav) => fav.episodeId === String(episode.id),
  );

  return (
    <Card key={episode.id} className="mt-4 flex min-w-52 flex-col gap-2 p-4">
      <button
        className="max-w-48 text-left text-lg font-bold"
        type="button"
        onClick={() => modal.show({ episode })}
      >
        {episode.name}
      </button>
      <p>{episode.episode}</p>
      {isFavorite && (
        <Heart
          className="mt-auto h-6 w-6 cursor-pointer self-end fill-red-500 text-red-500"
          onClick={() => {
            data?.user.id &&
              unfavoritize.mutate({
                userId: data.user.id,
                episodeId: String(episode.id),
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
              episodeId: String(episode.id),
            })
          }
        />
      )}
    </Card>
  );
};
