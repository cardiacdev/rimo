import { PaginationControls } from "../../components/ui/pagination-controls";
import { api } from "~/trpc/server";
import { EpisodeCard } from "./_components/episode-card";

export default async function EpisodePage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const page = searchParams.page ?? "1";
  const episodes = await api.episode.fetchAllEpisodes.query({ page });

  return (
    <>
      <div className="container mt-4 flex flex-wrap gap-x-4">
        {episodes.results.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
      <PaginationControls
        path={"/episode"}
        page={+page}
        pageCount={episodes.info.pages}
      />
    </>
  );
}
