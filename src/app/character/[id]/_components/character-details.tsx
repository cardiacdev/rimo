import { format } from "date-fns";
import Image from "next/image";
import React, { Suspense } from "react";
import { type Character } from "~/app/schema/character";
import { EpisodesForCharacter } from "./episodes-for-character";

interface CharacterDetailsProps {
  character: Character;
}

export const CharacterDetails = async ({
  character,
}: CharacterDetailsProps) => {
  return (
    <div className="text-md flex flex-col gap-2">
      <h1 className="text-2xl">
        <b>{character.name}</b>
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
      <div className="flex justify-between gap-48">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="mt-4"
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <EpisodesForCharacter character={character} />
      </Suspense>
    </div>
  );
};
