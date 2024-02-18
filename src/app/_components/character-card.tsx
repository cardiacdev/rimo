"use client";

import Image from "next/image";
import { Card } from "~/components/ui/card";
import { type Character } from "../schema/character";

export const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <Card key={character.id} className="mt-4 flex items-center gap-4 p-4">
      <div>
        <button className=" max-w-40 text-left text-xl font-bold">
          {character.name}
        </button>
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
  );
};
