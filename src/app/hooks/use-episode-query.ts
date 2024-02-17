"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import { URLSearchParamsToObj, type SearchParams } from "~/lib/utils";
import { isEpisodeCollection } from "../schema/episode";

const fetchEpisodes = async (params: SearchParams) => {
  const searchParams = new URLSearchParams(params);

  const data = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/episode?${searchParams.toString()}`,
  );

  try {
    const json = await data.json();

    if (!isEpisodeCollection(json)) throw new Error("Invalid response");

    return json;
  } catch (error) {
    throw new Error("Invalid response");
  }
};

export const useEpisodeQuery = ({ params }: { params: SearchParams }) => {
  return useQuery({
    queryKey: ["episode", { params: URLSearchParamsToObj(params) }],
    queryFn: () => fetchEpisodes(params),
  });
};
