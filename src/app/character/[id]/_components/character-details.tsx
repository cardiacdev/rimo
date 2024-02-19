import { format } from "date-fns";
import Image from "next/image";
import { Suspense } from "react";
import { type Character } from "~/app/schema/character";
import { EpisodesForCharacter } from "./episodes-for-character";
import { CharacterHeart } from "../../_components/character-heart";
import { CharacterFunFacts } from "./character-fun-facts";
import { getServerAuthSession } from "~/server/auth";

interface CharacterDetailsProps {
  character: Character;
}

export const CharacterDetails = async ({
  character,
}: CharacterDetailsProps) => {
  const session = await getServerAuthSession();
  return (
    <div className="w-full">
      <div className="flex justify-between gap-8">
        <div className="text-md flex flex-col gap-2">
          <h1 className="flex items-center gap-x-3 text-2xl underline decoration-primary underline-offset-8">
            <b>{character.name}</b>
            <CharacterHeart characterId={character.id} className="my-auto" />
          </h1>
          <p>
            <b>Species</b>: {character.species}
          </p>
          <p>
            <b>Status</b>: {character.status}
          </p>
          <p>
            <b>Gender</b>: {character.gender}
          </p>
          {character.type && (
            <p>
              <b>Type</b>: {character.type}
            </p>
          )}
          <p>
            <b>Created</b>: {format(character.created, "MM/dd/yyyy")}
          </p>
          <p>
            <b>Origin</b>: {character.origin.name}
          </p>
          <p>
            <b>Location</b>: {character.location.name}
          </p>
          {session?.user.id && <CharacterFunFacts character={character} />}
        </div>
        <Image
          src={character.image}
          alt={character.name}
          width={200}
          height={200}
          className="mt-4 aspect-square h-full rounded-full"
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <EpisodesForCharacter character={character} />
      </Suspense>
    </div>
  );
};
