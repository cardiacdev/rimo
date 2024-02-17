import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SearchParams = ConstructorParameters<typeof URLSearchParams>[0];

export function URLSearchParamsToObj(searchParams: SearchParams) {
  if (!searchParams) return {};

  if (typeof searchParams === "string") {
    return Object.fromEntries(new URLSearchParams(searchParams).entries());
  }

  if (Array.isArray(searchParams)) {
    return Object.fromEntries(searchParams) as Record<string, string>;
  }

  if (searchParams instanceof URLSearchParams) {
    return Object.fromEntries(searchParams.entries());
  }

  return searchParams;
}
