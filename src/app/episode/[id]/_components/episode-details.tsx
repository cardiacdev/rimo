"use client";

import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { useSingleCharacterQuery } from "~/app/hooks/use-single-character-query";
import { useSingleEpisodeQuery } from "~/app/hooks/use-single-episode-query";
import { useSomeCharacterQuery } from "~/app/hooks/use-some-character-query";
import { buttonVariants } from "~/components/ui/button";

interface EpisodeDetailsProps {
  id: string;
}

export const EpisodeDetails = ({ id }: EpisodeDetailsProps) => {
  const { data: episode } = useSingleEpisodeQuery({
    id,
  });

  const characterIds = episode?.characters.map((character) => {
    return character.split("/").pop() ?? "";
  });

  const isSingleCharacter =
    (characterIds && characterIds.length === 1) ?? false;
  const isMultipleCharacters =
    (characterIds && characterIds.length > 1) ?? false;

  const { data: characters } = useSomeCharacterQuery({
    ids: characterIds ?? [],
    enabled: isMultipleCharacters,
  });

  const { data: character } = useSingleCharacterQuery({
    id: characterIds?.[0] ?? "",
    enabled: isSingleCharacter,
  });

  if (!episode) {
    return null;
  }
  return (
    <>
      <div className="text-md flex flex-col gap-2">
        <h1 className="text-2xl">
          <b>{episode.name}</b>
        </h1>
        <p>
          <b>Air date</b>: {format(episode.air_date, "MM/dd/yyyy")}
        </p>
        <p>
          <b>Created</b>: {format(episode.created, "MM/dd/yyyy")}
        </p>
        <h2 className="mb-4 text-lg font-bold">Characters</h2>
        <div className="flex flex-wrap gap-4">
          {isMultipleCharacters &&
            characters?.map((character) => (
              <Link
                key={character.id}
                href={`/character/${character.id}`}
                className={buttonVariants()}
              >
                {character.name}
              </Link>
            ))}
          {isSingleCharacter && character && (
            <Link
              key={character.id}
              href={`/character/${character.id}`}
              className={buttonVariants()}
            >
              {character.name}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
