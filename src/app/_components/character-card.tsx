"use client";

import Image from "next/image";
import { Card } from "~/components/ui/card";
import { type Character } from "../schema/character";
import { useModal } from "@ebay/nice-modal-react";
import { CharacterDetailDialog } from "./character-detail-dialog";

export const CharacterCard = ({ character }: { character: Character }) => {
  const modal = useModal(CharacterDetailDialog, { character });

  return (
    <Card key={character.id} className="mt-4 flex items-center gap-4 p-4">
      <div>
        <button
          className=" max-w-40 text-left text-xl font-bold"
          onClick={() => modal.show({ character })}
        >
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
