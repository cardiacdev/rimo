import { api } from "~/trpc/server";
import { EpisodeDetails } from "./_components/episode-details";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params: { id } }: PageProps) {
  const episode = await api.episode.fetchSingleEpisode.query({ id: +id });

  return (
    <main className="flex min-h-screen bg-background">
      <div className="container pt-10 ">
        <EpisodeDetails episode={episode} />
      </div>
    </main>
  );
}
