"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import { isCharacter } from "../schema/character";

const fetchCharacter = async (id: string) => {
  const data = await fetch(`${env.NEXT_PUBLIC_API_URL}/character/${id}`);

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
  enabled = true,
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["character", { id }],
    queryFn: () => fetchCharacter(id),
    enabled,
  });
};
