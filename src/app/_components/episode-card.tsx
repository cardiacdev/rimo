import { Card } from "~/components/ui/card";
import { type Episode } from "../schema/episode";
import Link from "next/link";
import { EpisodeHeart } from "./episode-heart";

export const EpisodeCard = ({ episode }: { episode: Episode }) => {
  return (
    <Card key={episode.id} className="mt-4 flex min-w-52 flex-col gap-2 p-4">
      <Link
        href={`/episode/${episode.id}`}
        className="max-w-48 text-left text-lg font-bold"
      >
        {episode.name}
      </Link>
      <p>{episode.episode}</p>
      <EpisodeHeart episodeId={episode.id} />
    </Card>
  );
};
