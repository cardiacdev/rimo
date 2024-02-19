"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationLinks = () => {
  const path = usePathname();
  return (
    <>
      {" "}
      <Link href={"/character"}>
        <span
          className={`text-md ${path.includes("character") ? "font-bold text-primary" : ""}`}
        >
          Characters
        </span>
      </Link>
      <Link href={"/episode"}>
        <span
          className={`text-md ${path.includes("episode") ? "font-bold text-primary" : ""}`}
        >
          Episodes
        </span>
      </Link>
    </>
  );
};
