"use client";

import { useState } from "react";
import { type Episode } from "~/app/schema/episode";
import { Button } from "~/components/ui/button";
import { getEpisodeFunFacts } from "~/server/actions/teampilot-actions";

interface EpisodeFunFactsProps {
  episode: Episode;
}

export const EpisodeFunFacts = ({ episode }: EpisodeFunFactsProps) => {
  const [funFacts, setFunFacts] = useState<string[]>([]);

  return (
    <div>
      <div className="flex items-baseline flex-wrap gap-x-8">
        <h2 className="mb-4 mt-5 text-xl font-bold underline decoration-primary underline-offset-8">
          Fun facts
        </h2>
        <Button
          variant={"outline"}
          onClick={async () => {
            setFunFacts(["Loading..."]);
            const data = await getEpisodeFunFacts(episode);
            setFunFacts(data);
          }}
        >
          Generate fun facts with Teampilot!
        </Button>
      </div>
      <ul className="list-inside list-disc space-y-1">
        {funFacts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </div>
  );
};
