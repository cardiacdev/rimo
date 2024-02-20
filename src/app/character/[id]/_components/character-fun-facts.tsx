"use client";

import { useState } from "react";
import { type Character } from "~/app/schema/character";
import { Button } from "~/components/ui/button";
import { getCharacterFunFacts } from "~/server/actions/teampilot-actions";

interface CharacterFunFactsProps {
  character: Character;
}

export const CharacterFunFacts = ({ character }: CharacterFunFactsProps) => {
  const [funFacts, setFunFacts] = useState<string[]>([]);

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-8">
        <h2 className="mb-4 mt-5 text-xl font-bold underline decoration-primary underline-offset-8">
          Fun facts
        </h2>
        <Button
          variant={"outline"}
          onClick={async () => {
            setFunFacts(["Loading..."]);
            const data = await getCharacterFunFacts(character);
            setFunFacts(data);
          }}
        >
          Generate fun facts with Teampilot!
        </Button>
      </div>
      <ul className="max-w-lg list-inside list-disc space-y-1">
        {funFacts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </div>
  );
};
