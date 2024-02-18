import { EpisodeDetails } from "./_components/episode-details";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params: { id } }: PageProps) {
  // TODO - prefetch character

  return (
    <main className="flex min-h-screen bg-background">
      <div className="container flex pt-10 ">
        <EpisodeDetails id={id} />
      </div>
    </main>
  );
}
