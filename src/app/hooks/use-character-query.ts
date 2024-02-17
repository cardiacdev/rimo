"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import { URLSearchParamsToObj, type SearchParams } from "~/lib/utils";
import { isCharacterCollection } from "../schema/character";

const fetchCharacters = async (params: SearchParams) => {
  const searchParams = new URLSearchParams(params);

  const data = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/character?${searchParams.toString()}`,
  );

  try {
    const json = await data.json();

    if (!isCharacterCollection(json)) throw new Error("Invalid response");

    return json;
  } catch (error) {
    throw new Error("Invalid response");
  }
};

export const useCharacterQuery = ({ params }: { params: SearchParams }) => {
  return useQuery({
    queryKey: ["character", { params: URLSearchParamsToObj(params) }],
    queryFn: () => fetchCharacters(params),
  });
};
