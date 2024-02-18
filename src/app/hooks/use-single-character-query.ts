"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import { URLSearchParamsToObj, type SearchParams } from "~/lib/utils";
import { isCharacter } from "../schema/character";

const fetchCharacter = async (id: string, params: SearchParams) => {
  const searchParams = new URLSearchParams(params);

  const data = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/character/${id}?${searchParams.toString()}`,
  );

  try {
    const json = await data.json();

    if (!isCharacter(json)) throw new Error("Invalid response");

    return json;
  } catch (error) {
    throw new Error("Invalid response");
  }
};

export const useSingleCharacterQuery = ({
  id,
  params,
}: {
  id: string;
  params: SearchParams;
}) => {
  return useQuery({
    queryKey: ["character", { params: URLSearchParamsToObj(params), id }],
    queryFn: () => fetchCharacter(id, params),
  });
};
