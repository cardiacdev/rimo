"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import { isCharacterArray } from "../schema/character";

const fetchCharacter = async (ids: Array<string>) => {
  const idString = ids.join(",");
  const data = await fetch(`${env.NEXT_PUBLIC_API_URL}/character/${idString}`);

  try {
    const json = await data.json();

    if (!isCharacterArray(json)) throw new Error("Invalid response");

    return json;
  } catch (error) {
    throw new Error("Invalid response");
  }
};

export const useSomeCharacterQuery = ({
  ids,
  enabled = false,
}: {
  ids: Array<string>;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["character", { ids }],
    queryFn: () => fetchCharacter(ids),
    enabled,
  });
};
