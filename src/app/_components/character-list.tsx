"use client";

import { Card } from "~/components/ui/card";
import { useCharacterQuery } from "../hooks/use-character-query";
import Image from "next/image";

export const CharacterList = () => {
  const { data: characters } = useCharacterQuery({
    params: { page: "1" },
  });

  if (!characters) {
    return <div>Loading...</div>;
  }

  // TODO - Pagination

  return (
    <div className="mt-4 flex flex-wrap gap-x-4">
      {characters.results.map((character) => (
        <Card key={character.id} className="mt-4 flex items-center gap-4 p-4">
          <div>
            <h3 className=" max-w-40 text-xl font-bold">{character.name}</h3>
            <p>{character.species}</p>
          </div>
          <Image
            src={character.image}
            alt={character.name}
            width={75}
            height={75}
            className="rounded-full"
          />
        </Card>
      ))}
    </div>
  );
};
