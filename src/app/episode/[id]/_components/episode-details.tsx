import { format } from "date-fns";
import { type Episode } from "~/app/schema/episode";
import { CharactersForEpisode } from "./characters-for-episode";
import { Suspense } from "react";

interface EpisodeDetailsProps {
  episode: Episode;
}

export const EpisodeDetails = ({ episode }: EpisodeDetailsProps) => {
  return (
    <>
      <div className="text-md flex flex-col gap-2">
        <h1 className="text-2xl">
          <b>{episode.name}</b>
        </h1>
        <p>
          <b>Air date</b>: {format(episode.air_date, "MM/dd/yyyy")}
        </p>
        <p>
          <b>Created</b>: {format(episode.created, "MM/dd/yyyy")}
        </p>
        <h2 className="mb-4 text-lg font-bold">Characters</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <CharactersForEpisode episode={episode} />
        </Suspense>
      </div>
    </>
  );
};
