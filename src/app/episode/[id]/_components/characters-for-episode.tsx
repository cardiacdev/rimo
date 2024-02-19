import Link from "next/link";
import { type Episode } from "~/app/schema/episode";
import { buttonVariants } from "~/components/ui/button";
import { api } from "~/trpc/server";

interface CharactersForEpisodeProps {
  episode: Episode;
}

export const CharactersForEpisode = async ({
  episode,
}: CharactersForEpisodeProps) => {
  const characterIds = episode?.characters.map((character) => {
    return character.split("/").pop() ?? "";
  });

  const isSingleCharacter =
    (characterIds && characterIds.length === 1) ?? false;
  const isMultipleCharacters =
    (characterIds && characterIds.length > 1) ?? false;

  let character;
  let characters;

  if (isSingleCharacter && characterIds[0]) {
    character = await api.character.fetchSingleCharacter.query({
      id: characterIds[0],
    });
  } else if (isMultipleCharacters) {
    characters = await api.character.fetchMultipleCharacters.query({
      ids: characterIds,
    });
  }

  return (
    <div>
      <h2 className="mb-4 mt-5 text-xl font-bold underline decoration-primary underline-offset-8">
        Characters
      </h2>

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
  );
};
