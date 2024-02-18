"use client";

import { useEpisodeQuery } from "../hooks/use-episode-query";
import { useState } from "react";
import { PaginationControls } from "./pagination-controls";
import { EpisodeCard } from "./episode-card";

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
          <EpisodeCard key={episode.id} episode={episode} />
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
