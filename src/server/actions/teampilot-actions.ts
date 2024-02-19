"use server";

import { fetchTeampilotData } from "@teampilot/sdk";
import { z } from "zod";
import { type Character } from "~/app/schema/character";
import { type Episode } from "~/app/schema/episode";
import { env } from "~/env";
import { getServerAuthSession } from "../auth";

export async function getCharacterFunFacts(character: Character) {
  const session = await getServerAuthSession();
  if (!session?.user.id) {
    return ["You need to be logged in to use this feature."];
  }

  const data = await fetchTeampilotData({
    launchpadSlugId: env.TEAMPILOT_LAUNCHPAD_ID,
    message: `Get three fun facts about the character '${character.name}'.`,
    schema: z.object({
      funFacts: z.array(z.string()),
    }),
  });

  return data.funFacts;
}

export async function getEpisodeFunFacts(episode: Episode) {
  const session = await getServerAuthSession();
  if (!session?.user.id) {
    return ["You need to be logged in to use this feature."];
  }

  const data = await fetchTeampilotData({
    launchpadSlugId: env.TEAMPILOT_LAUNCHPAD_ID,
    message: `Get three fun facts about the episode '${episode.episode}', with the name ${episode.name}.`,
    schema: z.object({
      funFacts: z.array(z.string()),
    }),
  });

  return data.funFacts;
}
