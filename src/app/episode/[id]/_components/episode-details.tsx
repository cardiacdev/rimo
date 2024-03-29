import { format } from "date-fns";
import { type Episode } from "rickmortyapi";
import { CharactersForEpisode } from "./characters-for-episode";
import { Suspense } from "react";
import { EpisodeHeart } from "../../_components/episode-heart";
import { EpisodeFunFacts } from "./episode-fun-facts";
import { getServerAuthSession } from "~/server/auth";
import { Card } from "~/components/ui/card";

interface EpisodeDetailsProps {
  episode: Episode;
}

export const EpisodeDetails = async ({ episode }: EpisodeDetailsProps) => {
  const session = await getServerAuthSession();
  return (
    <>
      <Card className="text-md mx-auto mb-8 flex max-w-6xl flex-col gap-2 p-4 md:p-12">
        <h1 className="flex items-center gap-x-3 text-2xl underline decoration-primary underline-offset-8">
          <b>{episode.name}</b>
          <EpisodeHeart episodeId={episode.id} className="my-auto" />
        </h1>
        <p>
          <b>Air date</b>: {format(episode.air_date, "MM/dd/yyyy")}
        </p>
        <p>
          <b>Created</b>: {format(episode.created, "MM/dd/yyyy")}
        </p>
        {session?.user.id && <EpisodeFunFacts episode={episode} />}
        <Suspense fallback={<div>Loading...</div>}>
          <CharactersForEpisode episode={episode} />
        </Suspense>
      </Card>
    </>
  );
};
