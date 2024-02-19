import Image from "next/image";
import { Card } from "~/components/ui/card";
import { type Character } from "../schema/character";
import Link from "next/link";
import { CharacterHeart } from "./character-heart";

export const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <Card key={character.id} className="mt-4 flex items-center gap-4 p-4">
      <div>
        <Link
          href={`/character/${character.id}`}
          className=" max-w-40 text-left text-xl font-bold"
        >
          {character.name}
        </Link>
        <p>{character.species}</p>
      </div>
      <Image
        src={character.image}
        alt={character.name}
        width={75}
        height={75}
        className="rounded-full"
      />
      <CharacterHeart characterId={character.id} />
    </Card>
  );
};
