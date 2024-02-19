import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default async function Home() {
  return (
    <main className="flex min-h-screen bg-background">
      <div className="container flex gap-10 pt-10">
        <Link
          href={"/character"}
          className={cn(buttonVariants(), "p-10 text-2xl")}
        >
          Characters
        </Link>
        <Link
          href={"/episode"}
          className={cn(buttonVariants(), "p-10 text-2xl")}
        >
          Episodes
        </Link>
      </div>
    </main>
  );
}
