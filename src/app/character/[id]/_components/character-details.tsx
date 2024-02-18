"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSingleCharacterQuery } from "~/app/hooks/use-single-character-query";
import { useSingleEpisodeQuery } from "~/app/hooks/use-single-episode-query";
import { useSomeEpisodeQuery } from "~/app/hooks/use-some-episode-query";
import { buttonVariants } from "~/components/ui/button";

interface CharacterDetailsProps {
  id: string;
}

export const CharacterDetails = ({ id }: CharacterDetailsProps) => {
  const { data: character } = useSingleCharacterQuery({
    id,
  });

  const episodeIds = character?.episode.map((episode) => {
    return episode.split("/").pop() ?? "";
  });

  const isSingleEpisode = (episodeIds && episodeIds.length === 1) ?? false;
  const isMultipleEpisodes = (episodeIds && episodeIds.length > 1) ?? false;

  const { data: episodes } = useSomeEpisodeQuery({
    ids: episodeIds ?? [],
    enabled: isMultipleEpisodes,
  });

  const { data: episode } = useSingleEpisodeQuery({
    id: episodeIds?.[0] ?? "",
    enabled: isSingleEpisode,
  });

  if (!character) {
    return null;
  }

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
      <div>
        <h2 className="mb-4 text-lg font-bold">Episodes</h2>
        <div className="flex flex-wrap gap-4">
          {isMultipleEpisodes &&
            episodes?.map((episode) => (
              <Link
                key={episode.id}
                href={`/episode/${episode.id}`}
                className={buttonVariants()}
              >
                {episode.name}
              </Link>
            ))}
          {isSingleEpisode && episode && (
            <Link
              key={episode.id}
              href={`/episode/${episode.id}`}
              className={buttonVariants()}
            >
              {episode.name}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
