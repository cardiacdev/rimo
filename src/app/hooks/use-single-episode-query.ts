"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import { isEpisode } from "../schema/episode";

const fetchEpisode = async (id: string) => {
  const data = await fetch(`${env.NEXT_PUBLIC_API_URL}/episode/${id}`);

  try {
    const json = await data.json();

    if (!isEpisode(json)) throw new Error("Invalid response");

    return json;
  } catch (error) {
    throw new Error("Invalid response");
  }
};

export const useSingleEpisodeQuery = ({
  id,
  enabled = true,
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["episode", { id }],
    queryFn: () => fetchEpisode(id),
    enabled,
  });
};
