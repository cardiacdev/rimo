import Link from "next/link";
import { type Character } from "~/app/schema/character";
import { buttonVariants } from "~/components/ui/button";
import { api } from "~/trpc/server";

export const EpisodesForCharacter = async ({
  character,
}: {
  character: Character;
}) => {
  const episodeIds = character?.episode.map((episode) => {
    return episode.split("/").pop() ?? "";
  });

  const isSingleEpisode = (episodeIds && episodeIds.length === 1) ?? false;
  const isMultipleEpisodes = (episodeIds && episodeIds.length > 1) ?? false;

  let episode;
  let episodes;

  if (isSingleEpisode && episodeIds[0]) {
    episode = await api.episode.fetchSingleEpisode.query({ id: episodeIds[0] });
  } else if (isMultipleEpisodes) {
    episodes = await api.episode.fetchMultipleEpisodes.query({
      ids: episodeIds,
    });
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Episodes</h2>
      <div className="flex flex-wrap gap-4">
        {isMultipleEpisodes &&
          episodes?.map((episode) => (
            <Link
              key={episode.id}
              href={`/episode/${episode.id}`}
              className={buttonVariants()}
            >
              {episode.name}
            </Link>
          ))}
        {isSingleEpisode && episode && (
          <Link
            key={episode.id}
            href={`/episode/${episode.id}`}
            className={buttonVariants()}
          >
            {episode.name}
          </Link>
        )}
      </div>
    </div>
  );
};
