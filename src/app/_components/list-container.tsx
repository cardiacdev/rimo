"use client";

import { useState } from "react";
import { PlainTabsList, PlainTabsTrigger } from "~/components/ui/plain-tabs";
import { CharacterList } from "./character-list";
import { EpisodeList } from "./episode-list";

export const ListContainer = () => {
  const [activeTab, setActiveTab] = useState<"characters" | "episodes">(
    "characters",
  );

  return (
    <div>
      <PlainTabsList className="grid w-[19rem] grid-cols-2">
        <PlainTabsTrigger
          onClick={() => setActiveTab("characters")}
          data-state={activeTab === "characters" ? "active" : undefined}
        >
          Characters
        </PlainTabsTrigger>
        <PlainTabsTrigger
          onClick={() => setActiveTab("episodes")}
          data-state={activeTab === "episodes" ? "active" : undefined}
        >
          Episodes
        </PlainTabsTrigger>
      </PlainTabsList>
      {activeTab === "characters" && <CharacterList />}
      {activeTab === "episodes" && <EpisodeList />}
    </div>
  );
};
