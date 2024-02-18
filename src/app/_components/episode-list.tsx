"use client";

import { Card } from "~/components/ui/card";
import { useEpisodeQuery } from "../hooks/use-episode-query";
import { useState } from "react";
import { PaginationControls } from "./pagination-controls";

export const EpisodeList = () => {
  const [page, setPage] = useState(1);
  const { data: episodes } = useEpisodeQuery({
    params: { page: String(page) },
  });

  if (!episodes) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
      <PaginationControls
        first={() => setPage(1)}
        previous={() => setPage(page - 1)}
        next={() => setPage(page + 1)}
        last={() => setPage(episodes.info.pages)}
        page={page}
        pageCount={episodes.info.pages}
      />
    </>
  );
};
