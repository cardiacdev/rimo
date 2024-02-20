import { CharacterCard } from "./_components/character-card";
import { PaginationControls } from "../../components/ui/pagination-controls";
import { api } from "~/trpc/server";

export default async function CharacterPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const page = Number(searchParams.page ?? 1);
  const characters = await api.character.fetchAllCharacters.query({ page });

  return (
    <>
      <div className="container mt-4 flex flex-wrap gap-x-4">
        {characters.results?.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <PaginationControls
        path="/character"
        page={+page}
        pageCount={characters.info?.pages ?? 1}
      />
    </>
  );
}
