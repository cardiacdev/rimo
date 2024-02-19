"use client";

import {
  CaretLeftIcon,
  CaretRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

interface PaginationControlsProps {
  page: number;
  pageCount: number;
  path: string;
}

export const PaginationControls = ({
  page,
  pageCount,
  path,
}: PaginationControlsProps) => {
  const router = useRouter();
  const first = () => router.push(`${path}?page=1`);
  const previous = () => router.push(`${path}?page=${page - 1}`);
  const next = () => router.push(`${path}?page=${page + 1}`);
  const last = () => router.push(`${path}?page=${pageCount}`);

  return (
    <div className="absolute inset-x-0 z-50 flex items-center justify-center space-x-2 py-4 2xl:bottom-[5vh]">
      <Button variant="outline" size="sm" onClick={first} disabled={page === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={previous}
        disabled={page === 1}
      >
        <CaretLeftIcon />
      </Button>
      <span>{`Page ${page} of ${pageCount}`}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={next}
        disabled={page === pageCount}
      >
        <CaretRightIcon />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={last}
        disabled={page === pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </div>
  );
};
