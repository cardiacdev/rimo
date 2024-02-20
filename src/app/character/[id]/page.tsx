import { CharacterDetails } from "./_components/character-details";
import { api } from "~/trpc/server";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params: { id } }: PageProps) {
  const character = await api.character.fetchSingleCharacter.query({ id });
  return (
    <main className="flex min-h-screen bg-background">
      <div className="container pt-10">
        <CharacterDetails character={character} />
      </div>
    </main>
  );
}
