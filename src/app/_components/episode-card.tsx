import { Card } from "~/components/ui/card";
import { type Episode } from "../schema/episode";
import { useModal } from "@ebay/nice-modal-react";
import { EpisodeDetailDialog } from "./episode-detail-dialog";

export const EpisodeCard = ({ episode }: { episode: Episode }) => {
  const modal = useModal(EpisodeDetailDialog, { episode });

  return (
    <Card key={episode.id} className="mt-4 flex min-w-52 flex-col gap-2 p-4">
      <button
        className="max-w-40 text-left text-xl font-bold"
        type="button"
        onClick={() => modal.show({ episode })}
      >
        {episode.name}
      </button>
      <p>{episode.episode}</p>
      <p className="">
        <i>{episode.air_date}</i>
      </p>
    </Card>
  );
};
