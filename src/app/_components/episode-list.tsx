"use client";

import { Card } from "~/components/ui/card";
import { useEpisodeQuery } from "../hooks/use-episode-query";

export const EpisodeList = () => {
  const { data: episodes } = useEpisodeQuery({
    params: { page: "1" },
  });

  if (!episodes) {
    return <div>Loading...</div>;
  }

  // TODO - Pagination

  return (
    <div className="mt-4 flex flex-wrap gap-x-4">
      {episodes.results.map((episode) => (
        <Card
          key={episode.id}
          className="mt-4 flex min-w-52 flex-col gap-2 p-4"
        >
          <h3 className=" max-w-40 text-xl font-bold">{episode.name}</h3>
          <p>{episode.episode}</p>
          <p className="">
            <i>{episode.air_date}</i>
          </p>
        </Card>
      ))}
    </div>
  );
};
