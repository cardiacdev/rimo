"use client";

import { useState } from "react";
import { useCharacterQuery } from "../hooks/use-character-query";
import { CharacterCard } from "./character-card";
import { PaginationControls } from "./pagination-controls";

export const CharacterList = () => {
  const [page, setPage] = useState(1);
  const { data: characters } = useCharacterQuery({
    params: { page: String(page) },
  });

  if (!characters) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-x-4">
        {characters.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <PaginationControls
        first={() => setPage(1)}
        previous={() => setPage(page - 1)}
        next={() => setPage(page + 1)}
        last={() => setPage(characters.info.pages)}
        page={page}
        pageCount={characters.info.pages}
      />
    </>
  );
};
