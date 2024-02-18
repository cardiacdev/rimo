"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import { isEpisodeArray } from "../schema/episode";

const fetchEpisode = async (ids: Array<string>) => {
  const idString = ids.join(",");
  const data = await fetch(`${env.NEXT_PUBLIC_API_URL}/episode/${idString}`);

  try {
    const json = await data.json();

    if (!isEpisodeArray(json)) throw new Error("Invalid response");

    return json;
  } catch (error) {
    throw new Error("Invalid response");
  }
};

export const useSomeEpisodeQuery = ({
  ids,
  enabled = false,
}: {
  ids: Array<string>;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["episode", { ids }],
    queryFn: () => fetchEpisode(ids),
    enabled,
  });
};
